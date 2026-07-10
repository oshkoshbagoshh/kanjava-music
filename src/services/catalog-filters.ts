/**
 * Shared query-string parsers for catalog search filters.
 */
import type { DawType, LicenseType, ResourceType } from '../db/schema/index.js';
import { resolveFormatTypes, type CatalogFormatId } from './catalog.constants.js';

export const RESOURCE_TYPES = [
  'sample',
  'loop',
  'midi',
  'preset',
  'one_shot',
  'daw_template',
  'stem',
  'sample_pack',
  'vocal_pack',
] as const satisfies readonly ResourceType[];

export const DAW_TYPES = [
  'ableton_live',
  'logic_pro',
  'fl_studio',
  'cubase',
  'studio_one',
  'bitwig',
  'multi_daw',
  'not_applicable',
] as const satisfies readonly DawType[];

export const LICENSE_TYPES = [
  'royalty_free_standard',
  'royalty_free_exclusive',
  'cc0',
  'cc_by',
] as const satisfies readonly LicenseType[];

export const CATALOG_FORMAT_IDS = [
  'templates',
  'stems',
  'midi',
  'packs',
  'vocals',
  'presets',
] as const satisfies readonly CatalogFormatId[];

export function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

export function parseGenres(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  const parts = Array.isArray(raw) ? raw : raw.split(',');
  return parts
    .map((g) => g.trim().toLowerCase())
    .filter((g) => g.length > 0);
}

export function parseBpm(raw: string | undefined): number | undefined {
  if (raw === undefined || raw === '') return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function parseResourceType(raw: string | undefined): ResourceType | undefined {
  if (!raw) return undefined;
  return RESOURCE_TYPES.includes(raw as ResourceType) ? (raw as ResourceType) : undefined;
}

export function parseDawType(raw: string | undefined): DawType | undefined {
  if (!raw) return undefined;
  return DAW_TYPES.includes(raw as DawType) ? (raw as DawType) : undefined;
}

export function parseLicenseType(raw: string | undefined): LicenseType | undefined {
  if (!raw) return undefined;
  return LICENSE_TYPES.includes(raw as LicenseType) ? (raw as LicenseType) : undefined;
}

export function parseFormat(raw: string | undefined): ResourceType[] | undefined {
  if (!raw) return undefined;
  return resolveFormatTypes(raw);
}

/** Build search filters from Express query params. */
export function parseSearchQuery(query: Record<string, unknown>) {
  const q = typeof query.q === 'string' ? query.q : undefined;
  const type = parseResourceType(typeof query.type === 'string' ? query.type : undefined);
  const formatTypes = parseFormat(typeof query.format === 'string' ? query.format : undefined);
  const licenseType = parseLicenseType(
    typeof query.license_type === 'string' ? query.license_type : undefined,
  );
  const key = typeof query.key === 'string' ? query.key : undefined;
  const bpmMin = parseBpm(typeof query.bpm_min === 'string' ? query.bpm_min : undefined);
  const bpmMax = parseBpm(typeof query.bpm_max === 'string' ? query.bpm_max : undefined);
  const tags = parseTags(typeof query.tags === 'string' ? query.tags : undefined);
  const genres = parseGenres(
    typeof query.genre === 'string'
      ? query.genre
      : Array.isArray(query.genre)
        ? (query.genre as string[])
        : typeof query.genres === 'string'
          ? query.genres
          : undefined,
  );
  const daw = parseDawType(typeof query.daw === 'string' ? query.daw : undefined);
  const limit = query.limit ? Number.parseInt(String(query.limit), 10) : 50;
  const offset = query.offset ? Number.parseInt(String(query.offset), 10) : 0;

  return {
    q,
    type: formatTypes ? undefined : type,
    types: formatTypes,
    licenseType,
    key,
    bpmMin,
    bpmMax,
    tags,
    genres,
    daw,
    limit: Number.isFinite(limit) ? limit : 50,
    offset: Number.isFinite(offset) ? offset : 0,
  };
}
