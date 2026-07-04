import { describe, expect, it } from 'vitest';
import { compatibleKeys, isValidCamelotKey } from './camelot-compat.js';

describe('isValidCamelotKey', () => {
  it('accepts valid keys', () => {
    expect(isValidCamelotKey('8A')).toBe(true);
    expect(isValidCamelotKey('12B')).toBe(true);
    expect(isValidCamelotKey('1A')).toBe(true);
  });

  it('rejects invalid keys', () => {
    expect(isValidCamelotKey('13A')).toBe(false);
    expect(isValidCamelotKey('8C')).toBe(false);
    expect(isValidCamelotKey('Am')).toBe(false);
  });
});

describe('compatibleKeys', () => {
  it('returns self, relative, and adjacent numbers', () => {
    const keys = compatibleKeys('8A');
    expect(keys).toEqual(expect.arrayContaining(['8A', '8B', '7A', '9A']));
    expect(keys).toHaveLength(4);
  });

  it('wraps around the wheel', () => {
    expect(compatibleKeys('1A')).toEqual(
      expect.arrayContaining(['1A', '1B', '12A', '2A']),
    );
    expect(compatibleKeys('12B')).toEqual(
      expect.arrayContaining(['12B', '12A', '11B', '1B']),
    );
  });
});
