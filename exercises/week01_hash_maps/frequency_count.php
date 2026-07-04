<?php
declare(strict_types=1);

/**
 * Pattern 1 — Frequency table
 *
 * Count genre strings, return [genre => count] sorted by count descending.
 * Time: O(n + k log k) where k = unique genres
 * Space: O(k)
 */
function genre_frequency(array $genres): array
{
    $counts = [];

    foreach ($genres as $genre) {
        if (!isset($counts[$genre])) {
            $counts[$genre] = 0;
        }
        $counts[$genre]++;
    }

    // Sort by count desc; genre name asc as tiebreaker (stable teaching order)
    uksort($counts, static function (string $a, string $b) use ($counts): int {
        if ($counts[$a] !== $counts[$b]) {
            return $counts[$b] <=> $counts[$a];
        }
        return $a <=> $b;
    });

    return $counts;
}
