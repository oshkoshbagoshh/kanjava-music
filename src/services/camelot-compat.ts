/**
 * Camelot wheel adjacency for harmonic mixing suggestions (Phase 4 prep).
 * Keys are like "8A" (minor) / "8B" (major).
 */

const CAMELOT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export function isValidCamelotKey(key: string): boolean {
  return /^([1-9]|1[0-2])[AB]$/.test(key);
}

/**
 * Returns the given key plus its harmonic neighbors:
 * - same number, opposite letter (relative major/minor)
 * - adjacent numbers, same letter (±1 on the wheel)
 */
export function compatibleKeys(key: string): string[] {
  if (!isValidCamelotKey(key)) {
    return [];
  }

  const number = Number.parseInt(key.slice(0, -1), 10);
  const letter = key.slice(-1) as 'A' | 'B';
  const opposite = letter === 'A' ? 'B' : 'A';

  const prev = number === 1 ? 12 : number - 1;
  const next = number === 12 ? 1 : number + 1;

  return [
    key,
    `${number}${opposite}`,
    `${prev}${letter}`,
    `${next}${letter}`,
  ];
}

export function allCamelotKeys(): string[] {
  const keys: string[] = [];
  for (const n of CAMELOT_NUMBERS) {
    keys.push(`${n}A`, `${n}B`);
  }
  return keys;
}
