import { eq, sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { bundles } from '../db/schema/bundles.js';
import { storage } from './storage.service.js';

export class BundleError extends Error {
  constructor(
    message: string,
    readonly statusCode: number = 404,
  ) {
    super(message);
    this.name = 'BundleError';
  }
}

export class BundleService {
  async listActive() {
    const rows = await db.execute(sql`
      SELECT
        b.id,
        b.slug,
        b.title,
        b.description,
        b.regular_price_cents,
        b.compare_at_price_cents,
        b.cover_image_url,
        (
          SELECT count(*)::int
          FROM bundle_items bi
          WHERE bi.bundle_id = b.id
        ) AS item_count
      FROM bundles b
      WHERE b.status = 'active'
      ORDER BY b.created_at DESC
    `);

    return (rows as unknown as {
      id: string;
      slug: string;
      title: string;
      description: string | null;
      regular_price_cents: number;
      compare_at_price_cents: number | null;
      cover_image_url: string | null;
      item_count: number;
    }[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      regularPriceCents: row.regular_price_cents,
      compareAtPriceCents: row.compare_at_price_cents,
      coverImageUrl: row.cover_image_url,
      itemCount: row.item_count,
    }));
  }

  async getBySlug(slug: string) {
    const bundle = await db.query.bundles.findFirst({
      where: eq(bundles.slug, slug),
      with: {
        items: {
          with: {
            resource: {
              with: {
                producer: true,
                tags: true,
                genres: true,
              },
            },
          },
        },
      },
    });

    if (!bundle || bundle.status !== 'active') {
      throw new BundleError('Bundle not found.', 404);
    }

    const items = [...bundle.items].sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      id: bundle.id,
      slug: bundle.slug,
      title: bundle.title,
      description: bundle.description,
      regularPriceCents: bundle.regularPriceCents,
      compareAtPriceCents: bundle.compareAtPriceCents,
      coverImageUrl: bundle.coverImageUrl,
      items: items.map((item) => ({
        sortOrder: item.sortOrder,
        resource: {
          id: item.resource.id,
          title: item.resource.title,
          type: item.resource.type,
          daw: item.resource.daw,
          previewUrl: item.resource.previewUrl
            ? storage.publicUrl(item.resource.previewUrl)
            : null,
          waveformJsonUrl: item.resource.waveformJsonUrl
            ? storage.publicUrl(item.resource.waveformJsonUrl)
            : null,
          bpm: item.resource.bpm,
          musicalKey: item.resource.musicalKey,
          licenseType: item.resource.licenseType,
          regularPriceCents: item.resource.regularPriceCents,
          exclusivePriceCents: item.resource.exclusivePriceCents,
          producer: {
            username: item.resource.producer.username,
            displayName: item.resource.producer.displayName,
          },
          tags: item.resource.tags.map((t) => t.tag),
          genres: item.resource.genres.map((g) => g.genreSlug),
        },
      })),
    };
  }
}

export const bundleService = new BundleService();
