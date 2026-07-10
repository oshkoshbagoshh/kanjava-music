import { sql } from 'drizzle-orm';
import { db } from '../db/client.js';
import type { DawType, LicenseType, ResourceType } from '../db/schema/index.js';

export interface SearchFilters {
  q?: string;
  type?: ResourceType;
  types?: ResourceType[];
  bpmMin?: number;
  bpmMax?: number;
  key?: string;
  licenseType?: LicenseType;
  tags?: string[];
  genres?: string[];
  daw?: DawType;
  producerId?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResultRow {
  id: string;
  producer_id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  daw: DawType;
  preview_url: string | null;
  waveform_json_url: string | null;
  duration_ms: number | null;
  bpm: number | null;
  musical_key: string | null;
  license_type: LicenseType;
  price_cents: number | null;
  regular_price_cents: number | null;
  exclusive_price_cents: number | null;
  download_count: number;
  play_count: number;
  status: string;
  created_at: Date;
  producer_username: string;
  producer_display_name: string;
  tags: string[] | null;
  genres: string[] | null;
  rank: number;
}

const FTS_MIN_RESULTS = 5;

const RESOURCE_SELECT = sql`
  r.id,
  r.producer_id,
  r.title,
  r.description,
  r.type,
  r.daw,
  r.preview_url,
  r.waveform_json_url,
  r.duration_ms,
  r.bpm,
  r.musical_key,
  r.license_type,
  r.price_cents,
  r.regular_price_cents,
  r.exclusive_price_cents,
  r.download_count,
  r.play_count,
  r.status,
  r.created_at,
  p.username AS producer_username,
  p.display_name AS producer_display_name,
  (
    SELECT array_agg(rt.tag ORDER BY rt.tag)
    FROM resource_tags rt
    WHERE rt.resource_id = r.id
  ) AS tags,
  (
    SELECT array_agg(rg.genre_slug ORDER BY rg.genre_slug)
    FROM resource_genres rg
    WHERE rg.resource_id = r.id
  ) AS genres
`;

function buildFacetClauses(filters: SearchFilters): {
  clauses: ReturnType<typeof sql>[];
} {
  const clauses: ReturnType<typeof sql>[] = [sql`r.status = 'approved'`];

  if (filters.types && filters.types.length > 0) {
    clauses.push(sql`r.type = ANY(${filters.types})`);
  } else if (filters.type) {
    clauses.push(sql`r.type = ${filters.type}`);
  }
  if (filters.bpmMin !== undefined) {
    clauses.push(sql`r.bpm >= ${filters.bpmMin}`);
  }
  if (filters.bpmMax !== undefined) {
    clauses.push(sql`r.bpm <= ${filters.bpmMax}`);
  }
  if (filters.key) {
    clauses.push(sql`r.musical_key = ${filters.key}`);
  }
  if (filters.licenseType) {
    clauses.push(sql`r.license_type = ${filters.licenseType}`);
  }
  if (filters.producerId) {
    clauses.push(sql`r.producer_id = ${filters.producerId}`);
  }
  if (filters.daw) {
    clauses.push(sql`r.daw = ${filters.daw}`);
  }

  const tags = filters.tags ?? [];
  if (tags.length > 0) {
    clauses.push(sql`
      (
        SELECT count(DISTINCT rt.tag)
        FROM resource_tags rt
        WHERE rt.resource_id = r.id
          AND rt.tag = ANY(${tags})
      ) = ${tags.length}
    `);
  }

  const genres = filters.genres ?? [];
  if (genres.length > 0) {
    clauses.push(sql`
      (
        SELECT count(DISTINCT rg.genre_slug)
        FROM resource_genres rg
        WHERE rg.resource_id = r.id
          AND rg.genre_slug = ANY(${genres})
      ) = ${genres.length}
    `);
  }

  return { clauses };
}

function joinClauses(clauses: ReturnType<typeof sql>[]) {
  return sql.join(clauses, sql` AND `);
}

/**
 * Two-stage search: FTS (tsvector) first, pg_trgm fallback for typos/partials.
 */
export class SearchService {
  async search(filters: SearchFilters): Promise<SearchResultRow[]> {
    const limit = Math.min(filters.limit ?? 50, 100);
    const offset = filters.offset ?? 0;
    const query = filters.q?.trim();

    if (!query) {
      return this.browse(filters, limit, offset);
    }

    const ftsResults = await this.ftsSearch(query, filters, limit, offset);
    if (ftsResults.length >= FTS_MIN_RESULTS) {
      return ftsResults;
    }

    const trgmResults = await this.trigramSearch(query, filters, limit, offset);
    const seen = new Set(ftsResults.map((r) => r.id));
    const merged = [...ftsResults];
    for (const row of trgmResults) {
      if (!seen.has(row.id)) {
        merged.push(row);
        seen.add(row.id);
      }
    }
    return merged.slice(0, limit);
  }

  private async browse(
    filters: SearchFilters,
    limit: number,
    offset: number,
  ): Promise<SearchResultRow[]> {
    const { clauses } = buildFacetClauses(filters);
    const where = joinClauses(clauses);

    const rows = await db.execute(sql`
      SELECT
        ${RESOURCE_SELECT},
        0::float AS rank
      FROM resources r
      INNER JOIN producers p ON p.id = r.producer_id
      WHERE ${where}
      ORDER BY r.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return rows as unknown as SearchResultRow[];
  }

  private async ftsSearch(
    query: string,
    filters: SearchFilters,
    limit: number,
    offset: number,
  ): Promise<SearchResultRow[]> {
    const { clauses } = buildFacetClauses(filters);
    clauses.push(sql`r.search_vector @@ plainto_tsquery('english', ${query})`);
    const where = joinClauses(clauses);

    const rows = await db.execute(sql`
      SELECT
        ${RESOURCE_SELECT},
        ts_rank(r.search_vector, plainto_tsquery('english', ${query})) AS rank
      FROM resources r
      INNER JOIN producers p ON p.id = r.producer_id
      WHERE ${where}
      ORDER BY rank DESC, r.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return rows as unknown as SearchResultRow[];
  }

  private async trigramSearch(
    query: string,
    filters: SearchFilters,
    limit: number,
    offset: number,
  ): Promise<SearchResultRow[]> {
    const { clauses } = buildFacetClauses(filters);
    clauses.push(sql`(
      word_similarity(${query}, r.title) > 0.2
      OR EXISTS (
        SELECT 1 FROM resource_tags rt
        WHERE rt.resource_id = r.id
          AND word_similarity(${query}, rt.tag) > 0.2
      )
      OR EXISTS (
        SELECT 1 FROM resource_genres rg
        INNER JOIN genres g ON g.slug = rg.genre_slug
        WHERE rg.resource_id = r.id
          AND word_similarity(${query}, g.name) > 0.2
      )
    )`);
    const where = joinClauses(clauses);

    const rows = await db.execute(sql`
      SELECT
        ${RESOURCE_SELECT},
        GREATEST(
          word_similarity(${query}, r.title),
          COALESCE((
            SELECT MAX(word_similarity(${query}, rt.tag))
            FROM resource_tags rt
            WHERE rt.resource_id = r.id
          ), 0),
          COALESCE((
            SELECT MAX(word_similarity(${query}, g.name))
            FROM resource_genres rg
            INNER JOIN genres g ON g.slug = rg.genre_slug
            WHERE rg.resource_id = r.id
          ), 0)
        ) AS rank
      FROM resources r
      INNER JOIN producers p ON p.id = r.producer_id
      WHERE ${where}
      ORDER BY rank DESC, r.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    return rows as unknown as SearchResultRow[];
  }
}

export const searchService = new SearchService();
