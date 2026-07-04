import { createHash } from 'node:crypto';

/**
 * SHA-256 content hash for upload deduplication.
 * Ported from exercises/week01_hash_maps/etl_dedup.php (hash-map O(n) approach).
 */
export function sha256(data: Buffer | string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Keep only unique payloads by SHA-256, preserving first-seen order.
 */
export function dedupByHash(payloads: Buffer[]): Buffer[] {
  const seen = new Set<string>();
  const unique: Buffer[] = [];

  for (const payload of payloads) {
    const hash = sha256(payload);
    if (seen.has(hash)) {
      continue;
    }
    seen.add(hash);
    unique.push(payload);
  }

  return unique;
}
