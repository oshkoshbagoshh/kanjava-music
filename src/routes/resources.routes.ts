import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import {
  optionalAuth,
  requireAuth,
  type AuthedRequest,
} from '../middleware/auth.js';
import { ResourceError, resourceService } from '../services/resource.service.js';
import { searchService } from '../services/search.service.js';
import { storage } from '../services/storage.service.js';
import { UploadError, uploadService } from '../services/upload.service.js';
import type { LicenseType, ResourceType } from '../db/schema/index.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const resourceTypes = ['sample', 'loop', 'midi', 'preset', 'one_shot'] as const;
const licenseTypes = [
  'royalty_free_standard',
  'royalty_free_exclusive',
  'cc0',
  'cc_by',
] as const;

export const resourcesRouter = Router();

resourcesRouter.get('/', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const type = resourceTypes.includes(req.query.type as ResourceType)
      ? (req.query.type as ResourceType)
      : undefined;
    const licenseType = licenseTypes.includes(req.query.license_type as LicenseType)
      ? (req.query.license_type as LicenseType)
      : undefined;
    const key = typeof req.query.key === 'string' ? req.query.key : undefined;
    const bpmMin = req.query.bpm_min
      ? Number.parseInt(String(req.query.bpm_min), 10)
      : undefined;
    const bpmMax = req.query.bpm_max
      ? Number.parseInt(String(req.query.bpm_max), 10)
      : undefined;
    const tags =
      typeof req.query.tags === 'string'
        ? req.query.tags
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
        : undefined;
    const limit = req.query.limit
      ? Number.parseInt(String(req.query.limit), 10)
      : 50;
    const offset = req.query.offset
      ? Number.parseInt(String(req.query.offset), 10)
      : 0;

    const rows = await searchService.search({
      q,
      type,
      licenseType,
      key,
      bpmMin: Number.isFinite(bpmMin) ? bpmMin : undefined,
      bpmMax: Number.isFinite(bpmMax) ? bpmMax : undefined,
      tags,
      limit,
      offset,
    });

    const results = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      previewUrl: row.preview_url ? storage.publicUrl(row.preview_url) : null,
      waveformJsonUrl: row.waveform_json_url
        ? storage.publicUrl(row.waveform_json_url)
        : null,
      durationMs: row.duration_ms,
      bpm: row.bpm,
      musicalKey: row.musical_key,
      licenseType: row.license_type,
      priceCents: row.price_cents,
      downloadCount: row.download_count,
      playCount: row.play_count,
      createdAt: row.created_at,
      producer: {
        id: row.producer_id,
        username: row.producer_username,
        displayName: row.producer_display_name,
      },
      tags: row.tags ?? [],
      rank: row.rank,
    }));

    res.json({ results, count: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed.' });
  }
});

function paramId(req: { params: Record<string, string | string[] | undefined> }): string {
  const value = req.params.id;
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

resourcesRouter.get('/:id', async (req, res) => {
  try {
    const resource = await resourceService.getPublicById(paramId(req));
    res.json({ resource });
  } catch (err) {
    if (err instanceof ResourceError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to load resource.' });
  }
});

resourcesRouter.get('/:id/preview', async (req, res) => {
  try {
    const key = await resourceService.getPreviewKey(paramId(req));
    const stream = await storage.getStream(key);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    stream.pipe(res);
  } catch (err) {
    if (err instanceof ResourceError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Preview failed.' });
  }
});

resourcesRouter.post('/:id/play', async (req, res) => {
  try {
    await resourceService.recordPlay(paramId(req));
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record play.' });
  }
});

resourcesRouter.post(
  '/:id/download',
  optionalAuth,
  async (req: AuthedRequest, res) => {
    try {
      const result = await resourceService.download(
        paramId(req),
        req.producerId ?? null,
      );
      const stream = await storage.getStream(result.fileKey);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${result.filename}"`,
      );
      res.setHeader('X-License-Snapshot-Id', result.downloadId ?? '');
      stream.pipe(res);
    } catch (err) {
      if (err instanceof ResourceError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: 'Download failed.' });
    }
  },
);

resourcesRouter.post(
  '/',
  requireAuth,
  upload.single('file'),
  async (req: AuthedRequest, res) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'Audio/MIDI file is required.' });
        return;
      }

      const bodySchema = z.object({
        title: z.string().min(1).max(255),
        description: z.string().max(5000).optional(),
        type: z.enum(resourceTypes),
        licenseType: z.enum(licenseTypes).default('royalty_free_standard'),
        bpm: z.coerce.number().int().min(1).max(400).optional(),
        musicalKey: z.string().max(8).optional(),
        tags: z.string().optional(),
        agreementAccepted: z
          .union([z.literal('true'), z.literal('1'), z.literal(true)])
          .transform(() => true),
      });

      const body = bodySchema.parse(req.body);
      const tags = body.tags
        ? body.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const result = await uploadService.upload({
        producerId: req.producerId!,
        title: body.title,
        description: body.description,
        type: body.type,
        licenseType: body.licenseType,
        bpm: body.bpm,
        musicalKey: body.musicalKey,
        tags,
        agreementAccepted: body.agreementAccepted,
        file: {
          buffer: req.file.buffer,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
        },
      });

      res.status(202).json({ resource: result });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0]?.message ?? 'Invalid input' });
        return;
      }
      if (err instanceof UploadError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: 'Upload failed.' });
    }
  },
);
