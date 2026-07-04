<?php
declare(strict_types=1);

/**
 * Pattern 2 — YOUR PROJECT TASK (STUB — implement this)
 *
 * Yield chunks of exactly $chunkSize rows from a CSV path (last chunk may be smaller).
 * Memory must stay O(chunkSize), not O(file size) — use a generator + fgetcsv.
 *
 * Rule 1 (secure PHP): $path must be a hardcoded/caller-controlled path, never from $_GET.
 *
 * @return \Generator<int, list<list<string|null>>>
 */
function chunked_csv_reader(string $path, int $chunkSize): Generator
{
    // TODO: open $path, read rows into $chunk, yield when full, yield remainder at end
    yield [];
}
