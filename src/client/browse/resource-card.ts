import { previewPlayer } from '../player/preview-player.js';
import { drawWaveform, loadWaveform } from '../player/waveform-renderer.js';

export interface ResourceCardData {
  id: string;
  title: string;
  type: string;
  previewUrl: string | null;
  waveformJsonUrl: string | null;
  bpm: number | null;
  musicalKey: string | null;
  licenseType: string;
  downloadCount: number;
  playCount: number;
  producer: {
    username: string;
    displayName: string;
  };
  tags: string[];
}

function licenseLabel(licenseType: string): string {
  switch (licenseType) {
    case 'royalty_free_standard':
      return 'Royalty-free';
    case 'royalty_free_exclusive':
      return 'Royalty-free exclusive';
    case 'cc0':
      return 'CC0';
    case 'cc_by':
      return 'CC BY';
    default:
      return licenseType;
  }
}

export function createResourceCard(resource: ResourceCardData): HTMLElement {
  const card = document.createElement('article');
  card.className = 'resource-card';
  card.dataset.id = resource.id;

  const meta = [
    resource.type.replace('_', ' '),
    resource.bpm ? `${resource.bpm} BPM` : null,
    resource.musicalKey,
  ]
    .filter(Boolean)
    .join(' · ');

  card.innerHTML = `
    <div class="resource-card__header">
      <button type="button" class="play-btn" aria-label="Play preview" ${resource.previewUrl ? '' : 'disabled'}>
        <span class="play-btn__icon">▶</span>
      </button>
      <div class="resource-card__meta">
        <h3 class="resource-card__title"></h3>
        <p class="resource-card__sub">
          <a class="resource-card__producer" href="/artist/${encodeURIComponent(resource.producer.username)}"></a>
          <span class="resource-card__details"></span>
        </p>
      </div>
    </div>
    <canvas class="resource-card__waveform" height="48"></canvas>
    <div class="resource-card__footer">
      <span class="badge badge--license"></span>
      <span class="resource-card__stats"></span>
      <button type="button" class="btn btn--small download-btn">Download</button>
    </div>
    <div class="resource-card__tags"></div>
  `;

  card.querySelector('.resource-card__title')!.textContent = resource.title;
  card.querySelector('.resource-card__producer')!.textContent =
    resource.producer.displayName;
  card.querySelector('.resource-card__details')!.textContent = meta
    ? ` · ${meta}`
    : '';
  card.querySelector('.badge--license')!.textContent = licenseLabel(
    resource.licenseType,
  );
  card.querySelector('.resource-card__stats')!.textContent =
    `${resource.playCount} plays · ${resource.downloadCount} downloads`;

  const tagsEl = card.querySelector('.resource-card__tags')!;
  for (const tag of resource.tags) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  }

  const canvas = card.querySelector('canvas') as HTMLCanvasElement;
  if (resource.waveformJsonUrl) {
    void loadWaveform(resource.waveformJsonUrl).then((data) => {
      if (data) {
        drawWaveform(canvas, data, {
          active: previewPlayer.playingId === resource.id,
        });
      }
    });
  }

  const playBtn = card.querySelector('.play-btn') as HTMLButtonElement;
  const icon = playBtn.querySelector('.play-btn__icon')!;

  const syncPlayState = () => {
    const playing = previewPlayer.playingId === resource.id;
    icon.textContent = playing ? '■' : '▶';
    playBtn.classList.toggle('play-btn--active', playing);
    if (resource.waveformJsonUrl) {
      void loadWaveform(resource.waveformJsonUrl).then((data) => {
        if (data) drawWaveform(canvas, data, { active: playing });
      });
    }
  };

  previewPlayer.on('play', syncPlayState);
  previewPlayer.on('stop', syncPlayState);
  previewPlayer.on('ended', syncPlayState);

  playBtn.addEventListener('click', () => {
    if (!resource.previewUrl) return;
    void previewPlayer.play(resource.id, resource.previewUrl).catch(() => {
      playBtn.classList.add('play-btn--error');
    });
  });

  const downloadBtn = card.querySelector('.download-btn') as HTMLButtonElement;
  downloadBtn.addEventListener('click', async () => {
    downloadBtn.disabled = true;
    try {
      const res = await fetch(`/api/resources/${resource.id}/download`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        alert(data.error ?? 'Download failed');
        return;
      }
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') ?? '';
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] ?? `${resource.title}.bin`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      downloadBtn.disabled = false;
    }
  });


  return card;
}
