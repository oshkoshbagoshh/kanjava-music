<?php
declare(strict_types=1);

/**
 * Pattern 5 — Binary search (STUB)
 *
 * $tracks is sorted by BPM ascending. Each item: ['title' => string, 'bpm' => int]
 * Return index of first track with exact $bpm, or -1.
 *
 * @param list<array{title: string, bpm: int}> $tracks
 */
function binary_search_bpm(array $tracks, int $bpm): int
{
    // TODO: classic binary search on $tracks[$mid]['bpm']
    return -1;
}

/**
 * All tracks with BPM in [low, high] inclusive. Prefer O(log n + k).
 *
 * @param list<array{title: string, bpm: int}> $tracks
 * @return list<array{title: string, bpm: int}>
 */
function bpm_range(array $tracks, int $low, int $high): array
{
    // TODO: find leftmost >= low, rightmost <= high, slice
    return [];
}
