import { describe, expect, it } from 'vitest';
import { dedupByHash, sha256 } from './hash.service.js';

describe('sha256', () => {
  it('returns a stable hex digest', () => {
    expect(sha256('hello')).toBe(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    );
  });
});

describe('dedupByHash', () => {
  it('keeps first-seen unique payloads', () => {
    const a = Buffer.from('kick');
    const b = Buffer.from('snare');
    const aDup = Buffer.from('kick');

    const result = dedupByHash([a, b, aDup]);
    expect(result).toHaveLength(2);
    expect(result[0]?.toString()).toBe('kick');
    expect(result[1]?.toString()).toBe('snare');
  });

  it('returns empty for empty input', () => {
    expect(dedupByHash([])).toEqual([]);
  });
});
