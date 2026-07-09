/**
 * BullMQ worker: transcode preview (128kbps MP3) + extract waveform peaks.
 * Phase 1 — no Chromaprint fingerprinting yet.
 */
import { Worker } from 'bullmq';
import { eq } from 'drizzle-orm';
import { spawn } from 'node:child_process';
import { mkdirSync, unlinkSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { extname } from 'node:path';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import { config as loadDotenv } from 'dotenv';
import { db } from '../db/client.js';
import { resources } from '../db/schema/index.js';
import {
  PROCESS_RESOURCE_QUEUE,
  type ProcessResourceJob,
  getRedisConnectionOptions,
} from '../services/queue.js';
import { storage } from '../services/storage.service.js';

loadDotenv();

const PEAK_BINS = 200;

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const bin: string = typeof ffmpegPath === 'string' ? ffmpegPath : 'ffmpeg';
    const proc = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    proc.on('error', reject);
    proc.on('close', (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
      }
    });
  });
}

async function extractPeaks(inputPath: string): Promise<{ peaks: number[]; durationMs: number }> {
  const pcmPath = join(tmpdir(), `peaks-${Date.now()}.raw`);

  await runFfmpeg([
    '-y',
    '-i',
    inputPath,
    '-ac',
    '1',
    '-ar',
    '8000',
    '-f',
    's16le',
    pcmPath,
  ]);

  const pcm = readFileSync(pcmPath);
  unlinkSync(pcmPath);

  const sampleCount = Math.floor(pcm.length / 2);
  const durationMs = Math.round((sampleCount / 8000) * 1000);

  if (sampleCount === 0) {
    return { peaks: new Array(PEAK_BINS).fill(0), durationMs: 0 };
  }

  const samplesPerBin = Math.max(1, Math.floor(sampleCount / PEAK_BINS));
  const peaks: number[] = [];

  for (let bin = 0; bin < PEAK_BINS; bin++) {
    const start = bin * samplesPerBin;
    const end = Math.min(start + samplesPerBin, sampleCount);
    let max = 0;
    for (let i = start; i < end; i++) {
      const sample = Math.abs(pcm.readInt16LE(i * 2));
      if (sample > max) max = sample;
    }
    peaks.push(max / 32768);
  }

  return { peaks, durationMs };
}

async function encodePreviewFromInput(
  inputPath: string,
  resourceId: string,
  workDir: string,
): Promise<{
  previewKey: string;
  waveformKey: string;
  durationMs: number;
}> {
  const previewPath = join(workDir, 'preview.mp3');

  await runFfmpeg([
    '-y',
    '-i',
    inputPath,
    '-codec:a',
    'libmp3lame',
    '-b:a',
    '128k',
    '-ar',
    '44100',
    '-ac',
    '2',
    previewPath,
  ]);

  const previewBuf = readFileSync(previewPath);
  const previewKey = `previews/${resourceId}.mp3`;
  await storage.put(previewKey, previewBuf, 'audio/mpeg');

  const { peaks, durationMs } = await extractPeaks(previewPath);
  const waveformJson = JSON.stringify({ peaks, duration_ms: durationMs });
  const waveformKey = `waveforms/${resourceId}.json`;
  await storage.put(waveformKey, Buffer.from(waveformJson, 'utf8'), 'application/json');

  return { previewKey, waveformKey, durationMs };
}

async function processCompanionPreview(
  companionPreviewKey: string,
  resourceId: string,
  workDir: string,
): Promise<{
  previewKey: string;
  waveformKey: string;
  durationMs: number;
}> {
  const companion = await storage.get(companionPreviewKey);
  const ext = extname(companionPreviewKey).toLowerCase() || '.mp3';
  const inputPath = join(workDir, `companion${ext}`);
  writeFileSync(inputPath, companion);

  if (ext === '.mp3') {
    const { peaks, durationMs } = await extractPeaks(inputPath);
    const waveformKey = `waveforms/${resourceId}.json`;
    const waveformJson = JSON.stringify({ peaks, duration_ms: durationMs });
    await storage.put(waveformKey, Buffer.from(waveformJson, 'utf8'), 'application/json');
    return {
      previewKey: companionPreviewKey,
      waveformKey,
      durationMs,
    };
  }

  return encodePreviewFromInput(inputPath, resourceId, workDir);
}

async function processResource(job: ProcessResourceJob): Promise<void> {
  const { resourceId, originalKey, companionPreviewKey } = job;
  console.log(`[worker] processing ${resourceId}`);

  const workDir = join(tmpdir(), `kanjava-${resourceId}`);
  mkdirSync(workDir, { recursive: true });

  const ext = originalKey.includes('.') ? originalKey.slice(originalKey.lastIndexOf('.')) : '.bin';
  const inputPath = join(workDir, `original${ext}`);
  const previewPath = join(workDir, 'preview.mp3');

  const isMidi = ext === '.mid' || ext === '.midi';
  const isZip = ext === '.zip';

  let previewKey: string | null = null;
  let waveformKey: string | null = null;
  let durationMs: number | null = null;

  try {
    if (companionPreviewKey) {
      const result = await processCompanionPreview(companionPreviewKey, resourceId, workDir);
      previewKey = result.previewKey;
      waveformKey = result.waveformKey;
      durationMs = result.durationMs;
    } else if (!isMidi && !isZip) {
      const original = await storage.get(originalKey);
      writeFileSync(inputPath, original);
      const result = await encodePreviewFromInput(inputPath, resourceId, workDir);
      previewKey = result.previewKey;
      waveformKey = result.waveformKey;
      durationMs = result.durationMs;
    }
  } catch (err) {
    console.error(`[worker] audio processing failed for ${resourceId}:`, err);
  }

  await db
    .update(resources)
    .set({
      previewUrl: previewKey,
      waveformJsonUrl: waveformKey,
      durationMs,
      status: 'approved',
      updatedAt: new Date(),
    })
    .where(eq(resources.id, resourceId));

  for (const f of [inputPath, previewPath]) {
    if (existsSync(f)) unlinkSync(f);
  }

  console.log(`[worker] approved ${resourceId}`);
}

const worker = new Worker<ProcessResourceJob>(
  PROCESS_RESOURCE_QUEUE,
  async (job) => {
    await processResource(job.data);
  },
  {
    connection: getRedisConnectionOptions(),
    concurrency: 2,
  },
);

worker.on('failed', (job, err) => {
  console.error(`[worker] job ${job?.id} failed:`, err.message);
});

worker.on('ready', () => {
  console.log('[worker] waveform worker ready');
});

process.on('SIGINT', async () => {
  await worker.close();
  process.exit(0);
});
