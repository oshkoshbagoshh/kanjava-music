<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/adjacency.php';
require_once __DIR__ . '/bfs_producers.php';
require_once __DIR__ . '/dfs_shared_tags.php';
require_once __DIR__ . '/collab_recommend.php';

run_suite('Week 4 — Graphs (stubs)', static function (): void {
    $pairs = [[1, 2], [2, 3], [3, 4], [1, 5]];
    $graph = build_adjacency($pairs);
    assert_same_set([2, 5], $graph[1] ?? [], 'adjacency for node 1');

    // 1-2-3-4, and 1-5. Within 2 hops of 1: 1,2,5,3
    $within = bfs_within_hops($graph, 1, 2);
    assert_same_set([1, 2, 3, 5], $within, 'BFS within 2 hops of 1');

    $tags = [
        't1' => ['House', '128bpm'],
        't2' => ['Techno', '130bpm'],
        't3' => ['House', 'Dark'],
    ];
    assert_true(tracks_share_tag($tags, 't1', 't3') === true, 't1 and t3 share House');
    assert_true(tracks_share_tag($tags, 't1', 't2') === false, 't1 and t2 share nothing');

    $recs = recommend_producers($graph, 1, 2);
    assert_true(!in_array(1, $recs, true), 'recommendations exclude self');
    assert_same_set([2, 3, 5], $recs, 'depth-2 recommendations from 1');
});
