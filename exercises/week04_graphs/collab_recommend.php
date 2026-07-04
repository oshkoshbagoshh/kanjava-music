<?php
declare(strict_types=1);

/**
 * Pattern 4 — YOUR PROJECT TASK (STUB)
 *
 * Recommended producers: BFS depth-2 from $userId, exclude self,
 * optionally rank by shared tag count (simple: return BFS order).
 *
 * Schema reminder (design in comments or a .sql file later):
 *   users(id, name)
 *   collaborations(user_a_id, user_b_id)  -- undirected edge
 *   user_tags(user_id, tag)
 *
 * @param array<int|string, list<int|string>> $collabGraph
 * @return list<int|string>
 */
function recommend_producers(array $collabGraph, int|string $userId, int $maxHops = 2): array
{
    // TODO: BFS, drop $userId from results
    return [];
}
