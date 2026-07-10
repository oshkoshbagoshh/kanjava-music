import { Router } from 'express';
import { catalogService } from '../services/catalog.service.js';

export const catalogRouter = Router();

catalogRouter.get('/formats', (_req, res) => {
  res.json({ formats: catalogService.listFormats() });
});

export const genresRouter = Router();

genresRouter.get('/', async (_req, res) => {
  try {
    const genres = await catalogService.listGenres();
    res.json({ genres });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load genres.' });
  }
});
