#!/usr/bin/env bash
# Export local sqlite DB to dump.sql
set -euo pipefail

# Adjust DB_PATH to your local sqlite DB file path if different
DB_PATH="./prisma/dev.db"
DUMP_PATH="./dump.sql"

if [ ! -f "$DB_PATH" ]; then
  echo "SQLite DB not found at $DB_PATH"
  exit 1
fi

echo "Exporting $DB_PATH to $DUMP_PATH"
sqlite3 "$DB_PATH" .dump > "$DUMP_PATH"
echo "Done"
