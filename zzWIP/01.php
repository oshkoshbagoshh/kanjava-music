<?php
declare(strict_types=1);

/**
 * WIP: load application config and verify Hostinger API key is present.
 *
 * Secure PHP rules applied:
 * - Rule 4: never echo/log secrets (API keys, passwords)
 * - Rule 8: require only a hardcoded path (config.php)
 * - Rule 11: strict comparisons only
 */

// Rule 8: hardcoded include path only — never from user input
require_once __DIR__ . '/../config.php';

/**
 * Report whether an env key is set, without printing its value (Rule 4).
 */
function env_key_status(string $name): string
{
    $value = getenv($name);
    if ($value === false || $value === '') {
        return 'missing';
    }

    return 'set (' . strlen($value) . ' chars)';
}

$keys = [
    'DB_HOST',
    'DB_USER',
    'DB_PASS',
    'DB_NAME',
    'DB_CHARSET',
    'APP_ENV',
    'HOSTINGER_API_KEY',
];

echo "Environment key status (values intentionally hidden):\n";
foreach ($keys as $key) {
    echo $key . ': ' . env_key_status($key) . "\n";
}

$apiKey = getenv('HOSTINGER_API_KEY');
if ($apiKey === false || $apiKey === '') {
    fwrite(STDERR, "HOSTINGER_API_KEY is not set. Add it to .env (see .env.example).\n");
    exit(1);
}

// Rule 4: do not echo HOSTINGER_API_KEY or any secret
echo "HOSTINGER_API_KEY is loaded and ready for API calls.\n";
