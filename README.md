# kanjava-music

Kanjava Music — LAMP showcase site (Apache, PHP, MySQL).

Document root is `public/` so application config (`config.php`) stays above the web tree.

## Local development (Docker)

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

1. Copy the environment template (if you don't already have `.env`):

```bash
cp .env.example .env
```

2. Start the stack:

```bash
docker compose up --build
```

3. Open the site:

| Service     | URL                    |
|-------------|------------------------|
| Website     | http://localhost:8080  |
| phpMyAdmin  | http://localhost:8082  |

**Database (inside Docker):**

| Setting  | Value     |
|----------|-----------|
| Host     | `db` (from web container) or `localhost:3306` (from your machine) |
| Database | `kanjava` |
| User     | `kanjava` |
| Password | `kanjava` |
| Root     | `root` / `root` |

Source is bind-mounted, so edits to PHP/CSS/JS show up on refresh — no rebuild needed for code changes.

Stop the stack:

```bash
docker compose down
```

Remove the database volume (fresh MySQL):

```bash
docker compose down -v
```

## Local setup (without Docker)

1. Copy `.env.example` to `.env` and set `DB_HOST=localhost` with your MySQL credentials.
2. Point your web server document root at `public/`.

`config.php` loads `.env` when present. Never commit `.env` or other secret files.

## Deployment (later)

Hostinger and other hosts are deferred for now. When you're ready:

- Deploy the repo with document root at `public/`
- Keep secrets in a server-only `.env` (not in Git)
- See git history / prior docs for Hostinger GitHub deploy notes

## Secrets policy

Do not commit:

- `.env` (use `.env.example` as the template)
- SSH private keys (store under `~/.ssh/`)
- Credential notes, passwords, or mailbox setup dumps
