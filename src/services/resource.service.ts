import { eq, sql } from 'drizzle-orm';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import {
  type LicenseSnapshot,
  downloads,
  resources,
} from '../db/schema/index.js';
import { storage } from './storage.service.js';

export class ResourceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'ResourceError';
  }
}

const LICENSE_SUMMARIES: Record<string, string> = {
  royalty_free_standard:
    'Royalty-free standard license: non-exclusive commercial use, no ongoing royalties owed. Producer retains copyright.',
  royalty_free_exclusive:
    'Royalty-free exclusive license: sole commercial rights for the buyer. Producer retains copyright.',
  cc0: 'CC0 public-domain dedication: producer waives all rights.',
  cc_by: 'CC BY: free use with mandatory attribution.',
};

export class ResourceService {
  async getPublicById(id: string) {
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, id),
      with: {
        producer: true,
        tags: true,
        genres: true,
      },
    });

    if (!resource || resource.status !== 'approved') {
      throw new ResourceError('Resource not found.', 404);
    }

    return this.toPublic(resource);
  }

  async getByIdInternal(id: string) {
    return db.query.resources.findFirst({
      where: eq(resources.id, id),
      with: { producer: true, tags: true, genres: true },
    });
  }

  /**
   * Preview-only: never expose file_url (original).
   * Returns a streamable media path for the preview encode.
   */
  async getPreviewKey(id: string): Promise<string> {
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, id),
    });

    if (!resource || resource.status !== 'approved' || !resource.previewUrl) {
      throw new ResourceError('Preview not available.', 404);
    }

    return resource.previewUrl;
  }

  async recordPlay(id: string): Promise<void> {
    await db
      .update(resources)
      .set({
        playCount: sql`${resources.playCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(resources.id, id));
  }

  /**
   * Free download: capture license_snapshot_json, increment counter,
   * return original file key for streaming.
   */
  async download(id: string, downloaderId: string | null) {
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, id),
      with: { producer: true },
    });

    if (!resource || resource.status !== 'approved') {
      throw new ResourceError('Resource not found.', 404);
    }

    const effectivePrice =
      resource.regularPriceCents ?? resource.priceCents ?? null;

    if (effectivePrice !== null && effectivePrice > 0) {
      throw new ResourceError('Paid downloads are not available yet.', 402);
    }

    const snapshot: LicenseSnapshot = {
      resourceId: resource.id,
      title: resource.title,
      licenseType: resource.licenseType,
      producerId: resource.producerId,
      producerUsername: resource.producer.username,
      priceCents: effectivePrice,
      agreementVersion: env.AGREEMENT_VERSION,
      termsSummary:
        LICENSE_SUMMARIES[resource.licenseType] ??
        'Royalty-free license. Producer retains copyright.',
      capturedAt: new Date().toISOString(),
    };

    const [download] = await db
      .insert(downloads)
      .values({
        resourceId: resource.id,
        downloaderId,
        licenseSnapshotJson: snapshot,
      })
      .returning();

    await db
      .update(resources)
      .set({
        downloadCount: sql`${resources.downloadCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(resources.id, id));

    return {
      downloadId: download?.id,
      fileKey: resource.fileUrl,
      filename: `${resource.title.replace(/[^a-z0-9-_]+/gi, '_')}.${resource.fileUrl.split('.').pop()}`,
      licenseSnapshot: snapshot,
    };
  }

  toPublic(resource: {
    id: string;
    producerId: string;
    title: string;
    description: string | null;
    type: string;
    daw: string;
    previewUrl: string | null;
    waveformJsonUrl: string | null;
    durationMs: number | null;
    bpm: number | null;
    musicalKey: string | null;
    licenseType: string;
    priceCents: number | null;
    regularPriceCents: number | null;
    exclusivePriceCents: number | null;
    downloadCount: number;
    playCount: number;
    status: string;
    createdAt: Date;
    producer: { username: string; displayName: string };
    tags: { tag: string }[];
    genres: { genreSlug: string }[];
  }) {
    const regularPrice = resource.regularPriceCents ?? resource.priceCents;
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      daw: resource.daw,
      previewUrl: resource.previewUrl
        ? storage.publicUrl(resource.previewUrl)
        : null,
      waveformJsonUrl: resource.waveformJsonUrl
        ? storage.publicUrl(resource.waveformJsonUrl)
        : null,
      durationMs: resource.durationMs,
      bpm: resource.bpm,
      musicalKey: resource.musicalKey,
      licenseType: resource.licenseType,
      priceCents: regularPrice,
      regularPriceCents: regularPrice,
      exclusivePriceCents: resource.exclusivePriceCents,
      downloadCount: resource.downloadCount,
      playCount: resource.playCount,
      createdAt: resource.createdAt,
      producer: {
        id: resource.producerId,
        username: resource.producer.username,
        displayName: resource.producer.displayName,
      },
      tags: resource.tags.map((t) => t.tag),
      genres: resource.genres.map((g) => g.genreSlug),
    };
  }
}

export const resourceService = new ResourceService();
