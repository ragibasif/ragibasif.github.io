#!/usr/bin/env bash

set -euo pipefail

PORT="${PORT:-1313}"

if ! command -v hugo >/dev/null 2>&1; then
  echo "Error: hugo is not installed or not on PATH." >&2
  echo "Install Hugo first, then rerun this script." >&2
  exit 1
fi

exec hugo server \
  --buildDrafts \
  --disableFastRender \
  --bind 127.0.0.1 \
  --port "${PORT}" \
  --baseURL "http://localhost:${PORT}/"
