#!/bin/sh
set -eu

if [ "${RUN_DB_PUSH_ON_START:-true}" = "true" ]; then
  echo "Applying Prisma schema (db push)..."
  npx prisma db push
fi

exec "$@"
