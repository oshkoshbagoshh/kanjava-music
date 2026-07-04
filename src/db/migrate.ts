import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postgres from 'postgres';
import { config as loadDotenv } from 'dotenv';

loadDotenv();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const migrationsDir = fileURLToPath(new URL('./migrations', import.meta.url));

async function migrate(): Promise<void> {
  const sql = postgres(databaseUrl!, { max: 1 });

  // Concurrent migrate runners (app + worker) can race on type creation;
  // ignore duplicate_object / unique_violation and continue.
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `;
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code !== '23505' && code !== '42710') {
      throw err;
    }
  }

  const applied = await sql<{ id: string }[]>`SELECT id FROM schema_migrations`;
  const appliedSet = new Set(applied.map((row) => row.id));

  const files = readdirSync(migrationsDir)
    .filter((name) => name.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`skip ${file}`);
      continue;
    }

    const body = readFileSync(join(migrationsDir, file), 'utf8');
    console.log(`apply ${file}`);
    await sql.begin(async (tx) => {
      await tx.unsafe(body);
      await tx`INSERT INTO schema_migrations (id) VALUES (${file})`;
    });
  }

  await sql.end();
  console.log('Migrations complete');
}

migrate().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
