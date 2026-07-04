<?php
declare(strict_types=1);

/**
 * Pattern 2 — Sliding window (STUB — implement this)
 *
 * Longest contiguous run of unique track titles in a playlist.
 * Classic: longest substring without repeating characters, applied to titles.
 *
 * Target: O(n) time using a window [left, right] and a hash set/map of titles in window.
 *
 * @param list<string> $titles
 * @return list<string> The longest unique run (any valid max-length run is OK)
 */
function longest_unique_run(array $titles): array
{
    // TODO: implement sliding window
    // Hint: move $right forward; while duplicate in window, advance $left and drop titles.
    return [];
}
