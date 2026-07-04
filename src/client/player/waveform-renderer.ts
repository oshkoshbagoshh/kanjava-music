/**
 * Draw pre-computed peak data onto a canvas.
 * Peaks JSON shape: { peaks: number[], duration_ms: number }
 */

export interface WaveformData {
  peaks: number[];
  duration_ms: number;
}

export async function loadWaveform(url: string): Promise<WaveformData | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as WaveformData;
  } catch {
    return null;
  }
}

export function drawWaveform(
  canvas: HTMLCanvasElement,
  data: WaveformData,
  options: { active?: boolean; progress?: number } = {},
): void {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 280;
  const height = canvas.clientHeight || 48;
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const peaks = data.peaks;
  if (peaks.length === 0) return;

  const barWidth = width / peaks.length;
  const mid = height / 2;
  const active = options.active ?? false;
  const progress = options.progress ?? 0;
  const progressX = width * progress;

  for (let i = 0; i < peaks.length; i++) {
    const peak = peaks[i] ?? 0;
    const barHeight = Math.max(2, peak * (height - 4));
    const x = i * barWidth;
    const y = mid - barHeight / 2;

    if (active && x < progressX) {
      ctx.fillStyle = '#00d4ff';
    } else if (active) {
      ctx.fillStyle = '#70ae6e';
    } else {
      ctx.fillStyle = '#5a6064';
    }

    ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
  }
}
