import { eq, inArray } from 'drizzle-orm';
import { extname } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import {
  type DawType,
  type LicenseType,
  type ResourceType,
  genres,
  resourceGenres,
  resourceTags,
  resources,
  uploadAgreements,
} from '../db/schema/index.js';
import { sha256 } from './hash.service.js';
import { enqueueProcessResource } from './queue.js';
import { storage } from './storage.service.js';
import {
  validateUploadMeta,
} from './upload-validation.js';

export interface UploadInput {
  producerId: string;
  title: string;
  description?: string;
  type: ResourceType;
  licenseType: LicenseType;
  daw?: DawType;
  bpm?: number;
  musicalKey?: string;
  tags?: string[];
  genres: string[];
  regularPriceCents?: number;
  exclusivePriceCents?: number;
  agreementAccepted: boolean;
  file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  };
  previewFile?: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  };
}

export class UploadError extends Error {
  constructor(
    message: string,
    readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'UploadError';
  }
}

export class UploadService {
  /**
   * Dedup by content hash, store original privately, create pending resource,
   * record agreement acceptance, enqueue waveform/preview processing.
   */
  async upload(input: UploadInput) {
    if (!input.agreementAccepted) {
      throw new UploadError(
        'You must accept the producer upload agreement before uploading.',
        400,
      );
    }

    if (input.genres.length === 0) {
      throw new UploadError('At least one genre is required.', 400);
    }

    const uniqueGenres = [...new Set(input.genres.map((g) => g.trim().toLowerCase()))];
    const knownGenres = await db.query.genres.findMany({
      where: inArray(genres.slug, uniqueGenres),
    });

    if (knownGenres.length !== uniqueGenres.length) {
      const known = new Set(knownGenres.map((g) => g.slug));
      const unknown = uniqueGenres.filter((g) => !known.has(g));
      throw new UploadError(`Unknown genre(s): ${unknown.join(', ')}`, 400);
    }

    const metaError = validateUploadMeta({
      type: input.type,
      daw: input.daw,
      genres: uniqueGenres,
      fileOriginalname: input.file.originalname,
      hasPreviewFile: Boolean(input.previewFile),
      previewOriginalname: input.previewFile?.originalname,
      previewMimetype: input.previewFile?.mimetype,
    });
    if (metaError) {
      throw new UploadError(metaError, 400);
    }

    const daw: DawType =
      input.type === 'daw_template'
        ? (input.daw ?? 'not_applicable')
        : (input.daw ?? 'not_applicable');

    const fileHash = sha256(input.file.buffer);

    const existing = await db.query.resources.findFirst({
      where: eq(resources.fileHash, fileHash),
    });

    if (existing) {
      throw new UploadError(
        'This file has already been uploaded (duplicate content hash).',
        409,
      );
    }

    const ext = extname(input.file.originalname).toLowerCase() || '.bin';
    const resourceId = uuidv4();
    const originalKey = `originals/${resourceId}${ext}`;
    let companionPreviewKey: string | null = null;

    await storage.put(originalKey, input.file.buffer, input.file.mimetype);

    if (input.previewFile) {
      const previewExt = extname(input.previewFile.originalname).toLowerCase() || '.mp3';
      companionPreviewKey = `previews/${resourceId}${previewExt}`;
      await storage.put(
        companionPreviewKey,
        input.previewFile.buffer,
        input.previewFile.mimetype || 'audio/mpeg',
      );
    }

    const [resource] = await db
      .insert(resources)
      .values({
        id: resourceId,
        producerId: input.producerId,
        title: input.title,
        description: input.description ?? null,
        type: input.type,
        fileUrl: originalKey,
        fileHash,
        licenseType: input.licenseType,
        daw,
        bpm: input.bpm ?? null,
        musicalKey: input.musicalKey ?? null,
        regularPriceCents: input.regularPriceCents ?? null,
        exclusivePriceCents: input.exclusivePriceCents ?? null,
        priceCents: input.regularPriceCents ?? null,
        status: 'pending',
      })
      .returning();

    if (!resource) {
      throw new UploadError('Failed to create resource', 500);
    }

    await db.insert(resourceGenres).values(
      uniqueGenres.map((genreSlug) => ({
        resourceId: resource.id,
        genreSlug,
      })),
    );

    await db.insert(uploadAgreements).values({
      producerId: input.producerId,
      resourceId: resource.id,
      agreementVersion: env.AGREEMENT_VERSION,
    });

    const tags = (input.tags ?? [])
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    if (tags.length > 0) {
      await db.insert(resourceTags).values(
        tags.map((tag) => ({
          resourceId: resource.id,
          tag,
          weight: 1,
        })),
      );
    }

    await enqueueProcessResource({
      resourceId: resource.id,
      originalKey,
      companionPreviewKey,
    });

    return {
      id: resource.id,
      status: resource.status,
      title: resource.title,
      type: resource.type,
      daw: resource.daw,
      licenseType: resource.licenseType,
      genres: uniqueGenres,
    };
  }
}

export const uploadService = new UploadService();
