import { eq, sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import { genres } from '../db/schema/genres.js';
import { CATALOG_FORMATS } from './catalog.constants.js';

export class CatalogService {
  async listGenres(): Promise<
    { slug: string; name: string; sortOrder: number; resourceCount: number }[]
  > {
    const rows = await db.execute(sql`
      SELECT
        g.slug,
        g.name,
        g.sort_order AS sort_order,
        (
          SELECT count(*)::int
          FROM resource_genres rg
          INNER JOIN resources r ON r.id = rg.resource_id
          WHERE rg.genre_slug = g.slug AND r.status = 'approved'
        ) AS resource_count
      FROM genres g
      ORDER BY g.sort_order ASC, g.name ASC
    `);

    return (rows as unknown as {
      slug: string;
      name: string;
      sort_order: number;
      resource_count: number;
    }[]).map((row) => ({
      slug: row.slug,
      name: row.name,
      sortOrder: row.sort_order,
      resourceCount: row.resource_count,
    }));
  }

  listFormats() {
    return CATALOG_FORMATS.map((format) => ({
      id: format.id,
      title: format.title,
      description: format.description,
      types: format.types,
    }));
  }

  async getGenreBySlug(slug: string) {
    return db.query.genres.findFirst({
      where: eq(genres.slug, slug),
    });
  }
}

export const catalogService = new CatalogService();
