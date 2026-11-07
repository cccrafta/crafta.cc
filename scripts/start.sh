#!/bin/bash
REMOTE=false
for arg in "$@"; do [[ "$arg" == "--remote" ]] && REMOTE=true; done

ROOT="$(dirname "$0")"

# Load .env
if [ -f "$ROOT/.env" ]; then
  set -a; source "$ROOT/.env"; set +a
fi

if [ "$REMOTE" = true ]; then
  echo "Starting crafta.cc (frontend → Cloud Run)..."
  export NEXT_PUBLIC_WORDPRESS_URL="https://crafta-wp-523001806622.europe-west4.run.app"
  echo "Next.js on http://localhost:3000 → $NEXT_PUBLIC_WORDPRESS_URL"
  cd "$ROOT/frontend" && rm -rf .next/cache && npm run dev
else
  echo "Starting crafta.cc (local)..."

  # Start MySQL if not already running
  brew services start mysql 2>/dev/null

  # Wait for MySQL to be ready
  echo "Waiting for MySQL..."
  until mysql -u root -e "SELECT 1" &>/dev/null; do sleep 1; done
  echo "MySQL is ready."

  # Create database if it doesn't exist
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME:-crafta_cc};"
  mysql -u root -e "CREATE USER IF NOT EXISTS '${DB_USER:-wordpress}'@'localhost' IDENTIFIED BY '${DB_PASSWORD:-wordpress_secret_123}';"
  mysql -u root -e "GRANT ALL PRIVILEGES ON ${DB_NAME:-crafta_cc}.* TO '${DB_USER:-wordpress}'@'localhost';"
  mysql -u root -e "FLUSH PRIVILEGES;"

  # Start WordPress PHP server
  echo "Starting WordPress on http://localhost:8080"
  cd "$ROOT/backend" && php -S localhost:8080 &

  # Start Next.js frontend (clear Turbopack cache first to avoid stale CSS/JS)
  echo "Starting Next.js on http://localhost:3000"
  cd "$ROOT/frontend" && rm -rf .next/cache && npm run dev
fi
