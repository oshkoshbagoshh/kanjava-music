<?php
declare(strict_types=1);

/**
 * Pattern 5 — Sorting (STUB)
 *
 * Sort by BPM ascending, then title alphabetically as tiebreaker.
 * Use usort() with a strict comparator (Rule 11: use <=> not ==).
 *
 * @param list<array{title: string, bpm: int}> $tracks
 * @return list<array{title: string, bpm: int}>
 */
function sort_playlist(array $tracks): array
{
    // TODO: usort with comparator
    return $tracks;
}
