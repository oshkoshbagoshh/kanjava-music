import { eq } from 'drizzle-orm';
import { extname } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import {
  type LicenseType,
  type ResourceType,
  resourceTags,
  resources,
  uploadAgreements,
} from '../db/schema/index.js';
import { sha256 } from './hash.service.js';
import { enqueueProcessResource } from './queue.js';
import { storage } from './storage.service.js';

export interface UploadInput {
  producerId: string;
  title: string;
  description?: string;
  type: ResourceType;
  licenseType: LicenseType;
  bpm?: number;
  musicalKey?: string;
  tags?: string[];
  agreementAccepted: boolean;
  file: {
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

    await storage.put(originalKey, input.file.buffer, input.file.mimetype);

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
        bpm: input.bpm ?? null,
        musicalKey: input.musicalKey ?? null,
        priceCents: null,
        status: 'pending',
      })
      .returning();

    if (!resource) {
      throw new UploadError('Failed to create resource', 500);
    }

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
    });

    return {
      id: resource.id,
      status: resource.status,
      title: resource.title,
      type: resource.type,
      licenseType: resource.licenseType,
    };
  }
}

export const uploadService = new UploadService();
