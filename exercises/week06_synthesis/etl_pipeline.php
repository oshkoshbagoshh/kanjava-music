<?php
declare(strict_types=1);

/**
 * Pattern 6 — Synthesis (STUB)
 *
 * End-to-end mini ETL using all five patterns:
 * 1. Extract: read track rows from a nested array (XML stand-in) — recursion
 * 2. Transform: normalize genre names via hash map
 * 3. Deduplicate: SHA-256 of title|bpm|genre — hash map
 * 4. Index: sort by BPM, binary-search ready — sorting
 * 5. Relate: build genre co-occurrence graph edges — graphs
 *
 * Wire your Week 1–5 functions here (require them) or re-implement inline.
 *
 * @param array<string, mixed> $rawCollection Nested track structure
 * @return array{
 *   tracks: list<array{title: string, bpm: int, genre: string}>,
 *   genre_counts: array<string, int>,
 *   genre_graph: array<string, list<string>>
 * }
 */
function run_etl_pipeline(array $rawCollection): array
{
    // TODO:
    // Extract tracks recursively
    // Map raw genre aliases → canonical (e.g. "deep house" → "Deep House")
    // Dedup by content hash
    // Sort by BPM
    // Build undirected edges between genres that co-appear on any track pair in same "set"
    //   (simple version: connect genres that appear in the collection at all to a hub,
    //    or connect genres that share a mood — keep it small)
    return [
        'tracks' => [],
        'genre_counts' => [],
        'genre_graph' => [],
    ];
}
