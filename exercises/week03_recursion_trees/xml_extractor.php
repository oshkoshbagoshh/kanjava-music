<?php
declare(strict_types=1);

/**
 * Pattern 3 — Recursion (STUB)
 *
 * Recursively extract track nodes from a SimpleXMLElement-like structure.
 * For teaching, we use nested arrays shaped like:
 *   ['track' => ['genre' => 'House', 'mood' => 'Dark', 'instrument' => 'Kick']]
 * or a list of such nodes under 'tracks'.
 *
 * @param array<string, mixed> $node
 * @return list<array<string, string>>
 */
function extract_tracks(array $node): array
{
    // TODO: if node has genre/mood/instrument keys, collect it;
    // otherwise recurse into child arrays.
    return [];
}
