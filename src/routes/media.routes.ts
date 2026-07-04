import { Router } from 'express';
import { storage } from '../services/storage.service.js';

export const mediaRouter = Router();

/**
 * Serve local storage objects. Previews and waveforms are public;
 * originals are only reachable via the authenticated download endpoint.
 */
mediaRouter.get('*', async (req, res) => {
  try {
    const key = req.path.replace(/^\//, '');
    if (!key || key.includes('..')) {
      res.status(400).json({ error: 'Invalid path.' });
      return;
    }

    if (key.startsWith('originals/')) {
      res.status(403).json({ error: 'Original files require a license download.' });
      return;
    }

    if (!(await storage.exists(key))) {
      res.status(404).json({ error: 'Not found.' });
      return;
    }

    if (key.endsWith('.mp3')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    } else if (key.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }

    res.setHeader('Cache-Control', 'public, max-age=3600');
    const stream = await storage.getStream(key);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Media serve failed.' });
  }
});
