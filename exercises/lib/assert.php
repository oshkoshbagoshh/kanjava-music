<?php
declare(strict_types=1);

/**
 * Minimal assertion helpers for exercise runners.
 */

function assert_true(bool $condition, string $message): void
{
    if ($condition !== true) {
        throw new RuntimeException('FAIL: ' . $message);
    }
}

function assert_eq(mixed $expected, mixed $actual, string $message): void
{
    if ($expected !== $actual) {
        $exp = var_export($expected, true);
        $act = var_export($actual, true);
        throw new RuntimeException("FAIL: {$message}\n  expected: {$exp}\n  actual:   {$act}");
    }
}

function assert_same_set(array $expected, array $actual, string $message): void
{
    sort($expected);
    sort($actual);
    assert_eq($expected, $actual, $message);
}

function run_suite(string $title, callable $suite): void
{
    echo "=== {$title} ===\n";
    try {
        $suite();
        echo "OK — all assertions passed.\n\n";
    } catch (Throwable $e) {
        fwrite(STDERR, $e->getMessage() . "\n\n");
        exit(1);
    }
}
