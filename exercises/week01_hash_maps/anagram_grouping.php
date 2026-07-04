<?php
declare(strict_types=1);

/**
 * Pattern 1 — Anagram grouping
 *
 * Group track titles that are anagrams of each other (mislabelled duplicates).
 * Key idea: sort characters of each title → canonical key → hash map of groups.
 * Time: O(n * m log m) where m = average title length
 * Space: O(n * m)
 */
function group_anagram_titles(array $titles): array
{
    $groups = [];

    foreach ($titles as $title) {
        $normalized = strtolower(preg_replace('/\s+/', '', $title) ?? '');
        $chars = str_split($normalized);
        sort($chars);
        $key = implode('', $chars);

        if (!isset($groups[$key])) {
            $groups[$key] = [];
        }
        $groups[$key][] = $title;
    }

    return array_values($groups);
}
