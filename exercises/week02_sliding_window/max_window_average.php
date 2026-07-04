<?php
declare(strict_types=1);

/**
 * Pattern 2 — Sliding window (STUB — implement this)
 *
 * Maximum average over any contiguous window of exactly $k samples (audio levels).
 * Target: O(n) — maintain running sum; slide by adding right, subtracting left.
 *
 * @param list<int|float> $levels
 */
function max_window_average(array $levels, int $k): float
{
    // TODO: implement
    // Edge: if count($levels) < $k, decide: return 0.0 or throw — pick one and document it.
    return 0.0;
}
