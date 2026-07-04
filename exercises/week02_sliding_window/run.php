<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/assert.php';
require_once __DIR__ . '/longest_unique.php';
require_once __DIR__ . '/max_window_average.php';
require_once __DIR__ . '/chunked_csv_reader.php';

run_suite('Week 2 — Sliding window (stubs)', static function (): void {
    $run = longest_unique_run(['A', 'B', 'C', 'B', 'D', 'E']);
    // Longest unique runs include ["A","B","C"] (len 3) or ["C","B","D","E"] (len 4)
    assert_eq(4, count($run), 'longest unique run length is 4');
    assert_eq(count($run), count(array_unique($run)), 'run has no duplicates');

    $avg = max_window_average([1, 2, 3, 4, 5], 3);
    // windows: (1+2+3)/3=2, (2+3+4)/3=3, (3+4+5)/3=4 → max 4
    assert_eq(4.0, $avg, 'max window average of k=3');

    $csv = sys_get_temp_dir() . '/kanjava_chunk_' . getmypid() . '.csv';
    $fh = fopen($csv, 'wb');
    assert_true($fh !== false, 'open temp csv');
    for ($i = 1; $i <= 10; $i++) {
        fputcsv($fh, ['track-' . $i, 'House']);
    }
    fclose($fh);

    $chunks = iterator_to_array(chunked_csv_reader($csv, 3));
    @unlink($csv);

    assert_eq(4, count($chunks), '10 rows / chunk 3 → 4 chunks');
    assert_eq(3, count($chunks[0]), 'first chunk size 3');
    assert_eq(1, count($chunks[3]), 'last chunk size 1');
});
