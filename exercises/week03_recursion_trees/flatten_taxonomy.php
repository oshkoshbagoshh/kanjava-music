<?php
declare(strict_types=1);

/**
 * Pattern 3 — Recursion (STUB)
 *
 * Flatten nested taxonomy into full path strings.
 * Input example:
 *   ['Electronic' => ['House' => ['Deep House' => []], 'Techno' => []]]
 * Output:
 *   ['Electronic > House > Deep House', 'Electronic > Techno']
 *
 * @param array<string, mixed> $tree
 * @return list<string>
 */
function flatten_taxonomy(array $tree, string $prefix = ''): array
{
    // TODO: recurse; when children empty, emit path
    return [];
}
