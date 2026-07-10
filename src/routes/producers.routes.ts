import { Router } from 'express';
import { authService } from '../services/auth.service.js';
import { mapSearchRowToApi } from '../services/resource-mapper.js';
import { searchService } from '../services/search.service.js';

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

    const resources = rows.map((row) => {
      const mapped = mapSearchRowToApi(row);
      return {
        id: mapped.id,
        title: mapped.title,
        description: mapped.description,
        type: mapped.type,
        daw: mapped.daw,
        previewUrl: mapped.previewUrl,
        waveformJsonUrl: mapped.waveformJsonUrl,
        durationMs: mapped.durationMs,
        bpm: mapped.bpm,
        musicalKey: mapped.musicalKey,
        licenseType: mapped.licenseType,
        regularPriceCents: mapped.regularPriceCents,
        exclusivePriceCents: mapped.exclusivePriceCents,
        downloadCount: mapped.downloadCount,
        playCount: mapped.playCount,
        tags: mapped.tags,
        genres: mapped.genres,
        producer: mapped.producer,
      };
    });

    res.json({ producer, resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load producer profile.' });
  }
});

