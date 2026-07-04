<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/directory_size.php';
require_once __DIR__ . '/flatten_taxonomy.php';
require_once __DIR__ . '/xml_extractor.php';
require_once __DIR__ . '/jaos_scanner.php';

run_suite('Week 3 — Recursion & trees (stubs)', static function (): void {
    $root = sys_get_temp_dir() . '/kanjava_tree_' . getmypid();
    @mkdir($root . '/stems', 0777, true);
    file_put_contents($root . '/a.wav', str_repeat('x', 10));
    file_put_contents($root . '/stems/b.wav', str_repeat('y', 20));
    assert_eq(30, directory_total_size($root), 'directory total size');

    $tax = [
        'Electronic' => [
            'House' => ['Deep House' => []],
            'Techno' => [],
        ],
    ];
    $paths = flatten_taxonomy($tax);
    sort($paths);
    assert_eq(
        ['Electronic > House > Deep House', 'Electronic > Techno'],
        $paths,
        'flatten taxonomy paths'
    );

    $xmlLike = [
        'collection' => [
            'track' => ['genre' => 'House', 'mood' => 'Uplifting', 'instrument' => 'Pad'],
            'more' => [
                'track' => ['genre' => 'Techno', 'mood' => 'Dark', 'instrument' => 'Kick'],
            ],
        ],
    ];
    $tracks = extract_tracks($xmlLike);
    assert_eq(2, count($tracks), 'extract 2 tracks from nested structure');

    file_put_contents($root . '/project.als', 'als');
    file_put_contents($root . '/stems/loop.mid', 'mid');
    $manifest = jaos_scan($root);
    $types = array_column($manifest, 'type');
    sort($types);
    assert_true(in_array('als', $types, true), 'manifest includes als');
    assert_true(in_array('mid', $types, true), 'manifest includes mid');
    assert_true(in_array('wav', $types, true), 'manifest includes wav');

    // cleanup
    @unlink($root . '/a.wav');
    @unlink($root . '/project.als');
    @unlink($root . '/stems/b.wav');
    @unlink($root . '/stems/loop.mid');
    @rmdir($root . '/stems');
    @rmdir($root);
});
