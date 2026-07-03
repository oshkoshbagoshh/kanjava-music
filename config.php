<?php
/****
 *
 *  - AJ Javadi
 *  - Application config & constants (loaded from environment / local .env)
 *  - Hostinger Site for Kanjava Music
 *  - Keep this file above the web document root (public/)
 *
 */

/**
 * Load KEY=VALUE pairs from a local .env file into the process environment.
 * Production should set variables in Hostinger hPanel instead of committing secrets.
 */
function kanjava_load_env(string $path): void
{
    if (!is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }

        if (strpos($line, '=') === false) {
            continue;
        }

        [$name, $value] = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        // Strip optional surrounding quotes
        if (
            strlen($value) >= 2
            && (
                ($value[0] === '"' && $value[strlen($value) - 1] === '"')
                || ($value[0] === "'" && $value[strlen($value) - 1] === "'")
            )
        ) {
            $value = substr($value, 1, -1);
        }

        if ($name === '') {
            continue;
        }

        putenv("{$name}={$value}");
        $_ENV[$name] = $value;
    }
}

kanjava_load_env(__DIR__ . '/.env');

define('DB_HOST', getenv('DB_HOST') !== false && getenv('DB_HOST') !== '' ? getenv('DB_HOST') : 'localhost');
define('DB_USER', getenv('DB_USER') !== false ? getenv('DB_USER') : '');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_NAME', getenv('DB_NAME') !== false ? getenv('DB_NAME') : '');
define('DB_CHARSET', getenv('DB_CHARSET') !== false && getenv('DB_CHARSET') !== '' ? getenv('DB_CHARSET') : 'utf8mb4');
define('DB_COLLATE', getenv('DB_COLLATE') !== false ? getenv('DB_COLLATE') : '');
define('APP_ENV', getenv('APP_ENV') !== false && getenv('APP_ENV') !== '' ? getenv('APP_ENV') : 'production');

/****
 *
 *  FOLDER STRUCTURE:
 * - docs folder:
 * - logs:
 * - src:
 * - images:
 * - js
 * - CSS
 * - fonts
 * - icons
 * - favicon
 * - music
 * - videos
 * -
 */
