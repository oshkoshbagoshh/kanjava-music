<?php
declare(strict_types=1);

/**
 * Pattern 1 — Hash maps
 *
 * Two Sum: return indices of two numbers that add up to $target.
 * Time: O(n)  Space: O(n)
 *
 * For each value, we need (target - value) already seen.
 * Store value => index in a hash map as we scan once.
 */
function two_sum(array $nums, int $target): ?array
{
    $seen = []; // value => index

    foreach ($nums as $i => $num) {
        $need = $target - $num;
        if (isset($seen[$need])) {
            return [$seen[$need], $i];
        }
        $seen[$num] = $i;
    }

    return null;
}
