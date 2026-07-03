# kanjava-music

Kanjava Music — LAMP showcase site (Apache, PHP, MySQL) hosted on Hostinger.

Document root should be `public/` so application config (`config.php`) stays above the web tree.

## Local setup

1. Copy the environment template and fill in local values:

```bash
cp .env.example .env
```

2. Edit `.env` with your local MySQL credentials (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`).

3. Point your web server document root at `public/`.

`config.php` loads `.env` when present. Never commit `.env` or other secret files.

## Production (Hostinger)

Set the same variables in **hPanel → Environment variables** (or a server-only `.env` that is never committed):

| Variable     | Purpose              |
|--------------|----------------------|
| `DB_HOST`    | MySQL host           |
| `DB_USER`    | MySQL user           |
| `DB_PASS`    | MySQL password       |
| `DB_NAME`    | MySQL database name  |
| `DB_CHARSET` | Usually `utf8mb4`    |
| `APP_ENV`    | `production`         |

Deploy from `main` only after secrets live in Hostinger’s panel, not in the repository.

## Secrets policy

Do not commit:

- `.env` (use `.env.example` as the template)
- SSH private keys (store under `~/.ssh/`)
- Credential notes, passwords, or mailbox setup dumps

SSH keys for this project live at `~/.ssh/kanjav_music` (private) and `~/.ssh/kanjav_music.pub` (public). Local credential notes are kept outside the repo (for example `~/Documents/kanjava-music-secrets/`).
