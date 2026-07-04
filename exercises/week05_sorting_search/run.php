<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/binary_search_bpm.php';
require_once __DIR__ . '/playlist_sort.php';
require_once __DIR__ . '/counting_sort_bpm.php';
require_once __DIR__ . '/leaderboard.php';

run_suite('Week 5 — Sorting & binary search (stubs)', static function (): void {
    $tracks = [
        ['title' => 'Alpha', 'bpm' => 120],
        ['title' => 'Beta', 'bpm' => 128],
        ['title' => 'Gamma', 'bpm' => 128],
        ['title' => 'Delta', 'bpm' => 140],
    ];

    assert_eq(1, binary_search_bpm($tracks, 128), 'binary search finds first 128');
    assert_eq(-1, binary_search_bpm($tracks, 99), 'binary search miss');

    $range = bpm_range($tracks, 128, 140);
    assert_eq(3, count($range), 'BPM range [128,140] has 3 tracks');

    $unsorted = [
        ['title' => 'Zed', 'bpm' => 128],
        ['title' => 'Amy', 'bpm' => 120],
        ['title' => 'Bob', 'bpm' => 128],
    ];
    $sorted = sort_playlist($unsorted);
    assert_eq('Amy', $sorted[0]['title'], 'lowest BPM first');
    assert_eq('Bob', $sorted[1]['title'], 'title tiebreaker at 128');
    assert_eq('Zed', $sorted[2]['title'], 'title tiebreaker at 128');

    $counted = counting_sort_bpm($unsorted, 60, 200);
    assert_eq('Amy', $counted[0]['title'], 'counting sort BPM order');

    $scores = ['aj' => 100, 'mike' => 200, 'sam' => 150, 'lee' => 200];
    $top = top_n($scores, 3);
    assert_eq(3, count($top), 'top 3');
    assert_eq(200, $top[0]['points'], 'highest points first');
    // tie on 200: id asc → lee before mike
    assert_eq('lee', $top[0]['id'], 'tie-break id asc');
    assert_eq('mike', $top[1]['id'], 'second at 200');

    assert_eq(3, rank_of($scores, 'sam'), 'sam rank');
    assert_eq(null, rank_of($scores, 'nobody'), 'missing producer');
});
