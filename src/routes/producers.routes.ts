import { Router } from 'express';
import { authService } from '../services/auth.service.js';
import { searchService } from '../services/search.service.js';
import { storage } from '../services/storage.service.js';

export const producersRouter = Router();

producersRouter.get('/:username', async (req, res) => {
  try {
    const usernameParam = req.params.username;
    const username = Array.isArray(usernameParam)
      ? (usernameParam[0] ?? '')
      : (usernameParam ?? '');
    const producer = await authService.getByUsername(username);
    if (!producer) {
      res.status(404).json({ error: 'Producer not found.' });
      return;
    }

    const rows = await searchService.search({
      producerId: producer.id,
      limit: 50,
    });

    const resources = rows.map((row) => ({
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
      downloadCount: row.download_count,
      playCount: row.play_count,
      tags: row.tags ?? [],
    }));

    res.json({ producer, resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load producer profile.' });
  }
});

