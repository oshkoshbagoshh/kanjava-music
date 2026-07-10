import { Router } from 'express';
import { BundleError, bundleService } from '../services/bundle.service.js';

export const bundlesRouter = Router();

bundlesRouter.get('/', async (_req, res) => {
  try {
    const bundles = await bundleService.listActive();
    res.json({ bundles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load bundles.' });
  }
});

bundlesRouter.get('/:slug', async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? (slugParam[0] ?? '') : (slugParam ?? '');
    const bundle = await bundleService.getBySlug(slug);
    res.json({ bundle });
  } catch (err) {
    if (err instanceof BundleError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to load bundle.' });
  }
});
