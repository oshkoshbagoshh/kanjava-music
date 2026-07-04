<?php
declare(strict_types=1);

/**
 * Pattern 5 — Counting / bucket sort (STUB)
 *
 * Sort tracks by BPM where BPM is in [$minBpm, $maxBpm].
 * Target: O(n + k) where k = maxBpm - minBpm + 1.
 *
 * @param list<array{title: string, bpm: int}> $tracks
 * @return list<array{title: string, bpm: int}>
 */
function counting_sort_bpm(array $tracks, int $minBpm = 60, int $maxBpm = 200): array
{
    // TODO: buckets[bpm - minBpm][] = track; then flatten
    return $tracks;
}
