import type { SearchResultRow } from './search.service.js';
import { storage } from './storage.service.js';

export function mapSearchRowToApi(row: SearchResultRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    daw: row.daw,
    previewUrl: row.preview_url ? storage.publicUrl(row.preview_url) : null,
    waveformJsonUrl: row.waveform_json_url
      ? storage.publicUrl(row.waveform_json_url)
      : null,
    durationMs: row.duration_ms,
    bpm: row.bpm,
    musicalKey: row.musical_key,
    licenseType: row.license_type,
    priceCents: row.regular_price_cents ?? row.price_cents,
    regularPriceCents: row.regular_price_cents ?? row.price_cents,
    exclusivePriceCents: row.exclusive_price_cents,
    downloadCount: row.download_count,
    playCount: row.play_count,
    createdAt: row.created_at,
    producer: {
      id: row.producer_id,
      username: row.producer_username,
      displayName: row.producer_display_name,
    },
    tags: row.tags ?? [],
    genres: row.genres ?? [],
    rank: row.rank,
  };
}
