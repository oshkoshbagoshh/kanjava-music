<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/two_sum.php';
require_once __DIR__ . '/frequency_count.php';
require_once __DIR__ . '/anagram_grouping.php';
require_once __DIR__ . '/etl_dedup.php';

run_suite('Week 1 — Hash maps', static function (): void {
    // Two Sum
    assert_eq([0, 1], two_sum([2, 7, 11, 15], 9), 'two_sum classic');
    assert_eq([1, 2], two_sum([3, 2, 4], 6), 'two_sum middle pair');
    assert_eq(null, two_sum([1, 2, 3], 100), 'two_sum no pair');

    // Frequency count
    $genres = ['House', 'Techno', 'House', 'Deep House', 'Techno', 'House'];
    assert_eq(
        ['House' => 3, 'Techno' => 2, 'Deep House' => 1],
        genre_frequency($genres),
        'genre_frequency sorted by count desc'
    );

    // Anagram grouping
    $titles = ['Listen', 'Silent', 'Enlist', 'Track', 'Kartc', 'Hello'];
    $groups = group_anagram_titles($titles);
    assert_eq(3, count($groups), 'anagram groups count');

    $sizes = array_map('count', $groups);
    sort($sizes);
    assert_eq([1, 2, 3], $sizes, 'anagram group sizes');

    // ETL dedup — correctness
    $payloads = ['a', 'b', 'a', 'c', 'b', 'd'];
    assert_eq(['a', 'b', 'c', 'd'], dedup_by_hash_map($payloads), 'hash map dedup');
    assert_eq(['a', 'b', 'c', 'd'], dedup_by_nested_loop($payloads), 'nested loop dedup');

    // Real temp files
    $dir = sys_get_temp_dir() . '/kanjava_etl_' . getmypid();
    if (!is_dir($dir)) {
        mkdir($dir);
    }
    $p1 = $dir . '/f1.wav';
    $p2 = $dir . '/f2.wav';
    $p3 = $dir . '/f3.wav';
    file_put_contents($p1, 'same-bytes');
    file_put_contents($p2, 'same-bytes');
    file_put_contents($p3, 'other-bytes');
    $uniquePaths = dedup_file_paths([$p1, $p2, $p3]);
    assert_eq(2, count($uniquePaths), 'file path dedup keeps one per hash');
    assert_true(in_array($p1, $uniquePaths, true), 'first path wins');
    assert_true(in_array($p3, $uniquePaths, true), 'distinct content kept');
    @unlink($p1);
    @unlink($p2);
    @unlink($p3);
    @rmdir($dir);

    // Benchmark: 10k payloads, 8k unique
    $bench = make_benchmark_payloads(10_000, 8_000);

    $t0 = hrtime(true);
    $mapResult = dedup_by_hash_map($bench);
    $mapMs = (hrtime(true) - $t0) / 1e6;

    // Nested loop on full 10k is very slow — sample 500 for contrast
    $sample = array_slice($bench, 0, 500);
    $t1 = hrtime(true);
    $loopResult = dedup_by_nested_loop($sample);
    $loopMs = (hrtime(true) - $t1) / 1e6;

    assert_eq(8_000, count($mapResult), '10k payloads → 8k unique via hash map');
    assert_eq(count(dedup_by_hash_map($sample)), count($loopResult), 'sample methods agree');

    echo sprintf(
        "Benchmark: hash_map 10k → %d unique in %.2f ms | nested_loop 500 in %.2f ms\n",
        count($mapResult),
        $mapMs,
        $loopMs
    );
});
