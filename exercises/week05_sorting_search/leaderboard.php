<?php
declare(strict_types=1);

/**
 * Pattern 5 — YOUR PROJECT TASK (STUB)
 *
 * In-memory stand-in for SQL leaderboard.
 * $scores: producerId => points
 *
 * top_n: highest scores first, producer id asc as tiebreaker.
 * rank_of: 1-based rank (1 = highest). Ties: same points → same rank (competition ranking optional;
 *          use dense or standard — document your choice). Use standard: tied scores share
 *          the minimum rank, next rank skips (or implement simple unique sort order).
 *
 * Simple teaching choice: sort desc by points, asc by id; rank = index + 1 (no tie sharing).
 *
 * @param array<int|string, int> $scores
 * @return list<array{id: int|string, points: int}>
 */
function top_n(array $scores, int $n = 100): array
{
    // TODO
    return [];
}

/**
 * @param array<int|string, int> $scores
 */
function rank_of(array $scores, int|string $producerId): ?int
{
    // TODO: return null if missing
    return null;
}
