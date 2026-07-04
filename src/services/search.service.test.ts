import { describe, expect, it } from 'vitest';

/**
 * Unit tests for search filter parsing helpers.
 * Full SQL integration requires a live Postgres instance.
 */

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

function parseBpm(raw: string | undefined): number | undefined {
  if (raw === undefined || raw === '') return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

describe('search filter parsers', () => {
  it('parses comma-separated tags', () => {
    expect(parseTags('Techno, Acid, ')).toEqual(['techno', 'acid']);
  });

  it('returns empty for missing tags', () => {
    expect(parseTags(undefined)).toEqual([]);
  });

  it('parses bpm bounds', () => {
    expect(parseBpm('128')).toBe(128);
    expect(parseBpm('')).toBeUndefined();
    expect(parseBpm('nope')).toBeUndefined();
  });
});
