<?php
declare(strict_types=1);

/**
 * Pattern 4 — BFS (STUB)
 *
 * All producers reachable within $maxHops of $startId (including start at depth 0).
 *
 * @param array<int|string, list<int|string>> $graph
 * @return list<int|string>
 */
function bfs_within_hops(array $graph, int|string $startId, int $maxHops): array
{
    // TODO: queue of [node, depth], visited set — see algorithms.rtf Pattern 4
    return [];
}
