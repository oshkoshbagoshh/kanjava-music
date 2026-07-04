<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/etl_pipeline.php';

run_suite('Week 6 — Synthesis (stub)', static function (): void {
    $raw = [
        'collection' => [
            'track' => ['title' => 'Night Drive', 'bpm' => 124, 'genre' => 'deep house'],
            'batch' => [
                'track' => ['title' => 'Night Drive', 'bpm' => 124, 'genre' => 'Deep House'], // dup
                'track2' => ['title' => 'Warehouse', 'bpm' => 130, 'genre' => 'Techno'],
            ],
        ],
    ];

    $out = run_etl_pipeline($raw);

    assert_eq(2, count($out['tracks']), 'deduped to 2 tracks');
    assert_true(isset($out['genre_counts']['Deep House']), 'canonical Deep House counted');
    assert_eq(124, $out['tracks'][0]['bpm'], 'tracks sorted by BPM ascending');
    assert_true($out['genre_graph'] !== [], 'genre graph has edges');
});
