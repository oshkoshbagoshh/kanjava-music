import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { env } from '../config/env.js';
import {
  DAW_TYPES,
  LICENSE_TYPES,
  RESOURCE_TYPES,
} from '../services/catalog-filters.js';
import {
  optionalAuth,
  requireAuth,
  type AuthedRequest,
} from '../middleware/auth.js';
import { parseSearchQuery } from '../services/catalog-filters.js';
import { ResourceError, resourceService } from '../services/resource.service.js';
import { mapSearchRowToApi } from '../services/resource-mapper.js';
import { searchService } from '../services/search.service.js';
import { storage } from '../services/storage.service.js';
import { UploadError, uploadService } from '../services/upload.service.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_UPLOAD_BYTES },
});

export const resourcesRouter = Router();

resourcesRouter.get('/', async (req, res) => {
  try {
    const filters = parseSearchQuery(req.query as Record<string, unknown>);
    const rows = await searchService.search(filters);
    const results = rows.map(mapSearchRowToApi);
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
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'previewFile', maxCount: 1 },
  ]),
  async (req: AuthedRequest, res) => {
    try {
      const files = req.files as
        | { file?: Express.Multer.File[]; previewFile?: Express.Multer.File[] }
        | undefined;
      const mainFile = files?.file?.[0];
      const previewFile = files?.previewFile?.[0];

      if (!mainFile) {
        res.status(400).json({ error: 'File is required.' });
        return;
      }

      const bodySchema = z.object({
        title: z.string().min(1).max(255),
        description: z.string().max(5000).optional(),
        type: z.enum(RESOURCE_TYPES),
        licenseType: z.enum(LICENSE_TYPES).default('royalty_free_standard'),
        daw: z.enum(DAW_TYPES).optional(),
        bpm: z.coerce.number().int().min(1).max(400).optional(),
        musicalKey: z.string().max(8).optional(),
        tags: z.string().optional(),
        genres: z.string().min(1),
        regularPriceCents: z.coerce.number().int().min(0).optional(),
        exclusivePriceCents: z.coerce.number().int().min(0).optional(),
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
      const genreSlugs = body.genres
        .split(',')
        .map((g) => g.trim().toLowerCase())
        .filter(Boolean);

      const result = await uploadService.upload({
        producerId: req.producerId!,
        title: body.title,
        description: body.description,
        type: body.type,
        licenseType: body.licenseType,
        daw: body.daw,
        bpm: body.bpm,
        musicalKey: body.musicalKey,
        tags,
        genres: genreSlugs,
        regularPriceCents: body.regularPriceCents,
        exclusivePriceCents: body.exclusivePriceCents,
        agreementAccepted: body.agreementAccepted,
        file: {
          buffer: mainFile.buffer,
          originalname: mainFile.originalname,
          mimetype: mainFile.mimetype,
        },
        previewFile: previewFile
          ? {
              buffer: previewFile.buffer,
              originalname: previewFile.originalname,
              mimetype: previewFile.mimetype,
            }
          : undefined,
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
