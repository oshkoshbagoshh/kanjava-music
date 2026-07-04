<?php
declare(strict_types=1);

/**
 * Pattern 1 — YOUR PROJECT TASK: ETL dedup
 *
 * Given payloads (stand-in for file contents), keep only unique SHA-256 hashes.
 * Hash-map approach: O(n) time, O(u) space (u = unique count).
 * Nested-loop approach: O(n²) — only for small-n benchmark contrast.
 */

/**
 * @param list<string> $payloads Simulated file contents (or real file_get_contents results)
 * @return list<string> Unique payloads in first-seen order
 */
function dedup_by_hash_map(array $payloads): array
{
    $seen = [];
    $unique = [];

    foreach ($payloads as $payload) {
        $hash = hash('sha256', $payload);
        if (isset($seen[$hash])) {
            continue;
        }
        $seen[$hash] = true;
        $unique[] = $payload;
    }

    return $unique;
}

/**
 * Naive O(n²) — compare every payload to all previously kept uniques.
 *
 * @param list<string> $payloads
 * @return list<string>
 */
function dedup_by_nested_loop(array $payloads): array
{
    $unique = [];

    foreach ($payloads as $payload) {
        $hash = hash('sha256', $payload);
        $isDup = false;
        foreach ($unique as $kept) {
            if (hash('sha256', $kept) === $hash) {
                $isDup = true;
                break;
            }
        }
        if ($isDup !== true) {
            $unique[] = $payload;
        }
    }

    return $unique;
}

/**
 * Real paths: hash file contents, return unique paths (first path wins per hash).
 *
 * @param list<string> $paths
 * @return list<string>
 */
function dedup_file_paths(array $paths): array
{
    $seen = [];
    $uniquePaths = [];

    foreach ($paths as $path) {
        if (!is_readable($path)) {
            continue;
        }
        $contents = file_get_contents($path);
        if ($contents === false) {
            continue;
        }
        $hash = hash('sha256', $contents);
        if (isset($seen[$hash])) {
            continue;
        }
        $seen[$hash] = true;
        $uniquePaths[] = $path;
    }

    return $uniquePaths;
}

/**
 * Build n payloads with intentional duplicates for benchmarking.
 *
 * @return list<string>
 */
function make_benchmark_payloads(int $n, int $uniqueCount): array
{
    $payloads = [];
    for ($i = 0; $i < $n; $i++) {
        $payloads[] = 'track-content-' . ($i % $uniqueCount);
    }
    return $payloads;
}
