<?php
declare(strict_types=1);

/**
 * Pattern 3 — Recursion (STUB)
 *
 * Total size of a directory tree.
 * Base case: file → filesize
 * Recursive case: directory → sum(children)
 *
 * Rule 1: $path is caller-controlled, never from request input.
 */
function directory_total_size(string $path): int
{
    // TODO: implement recursive walk
    return 0;
}
