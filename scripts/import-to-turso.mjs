import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

// Usage: put TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.development.local or .env.local
// or export them in your shell, then run:
// npm run turso:import

// Try to load common env files if present (won't overwrite already-set env vars)
const cwd = process.cwd();
dotenv.config({ path: path.resolve(cwd, '.env.development.local') });
dotenv.config({ path: path.resolve(cwd, '.env.local') });
dotenv.config({ path: path.resolve(cwd, '.env') });

const DUMP_FILE = path.resolve(process.cwd(), 'dump.sql');

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in the environment');
  console.error('You can set them in .env.development.local, .env.local, or export them in your shell.');
  process.exit(1);
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  if (!fs.existsSync(DUMP_FILE)) {
    console.error('dump.sql not found. Run scripts/export-sqlite.sh first to create it.');
    process.exit(1);
  }

  const sql = fs.readFileSync(DUMP_FILE, 'utf8');

  // Naive split on semicolons — this works for simple dumps. Skip PRAGMA and sqlite_sequence.
  const statements = sql
    .split(/;\s*$/m)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !/^PRAGMA/i.test(s))
    .filter((s) => !/sqlite_sequence/i.test(s));

  for (const stmt of statements) {
    try {
      console.log('Executing:', stmt.slice(0, 140).replace(/\n/g, ' '));
      await client.execute(stmt);
    } catch (err) {
      console.warn('Statement failed (skipped). Error:', err && err.message ? err.message : String(err));
    }
  }

  console.log('Import finished');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
