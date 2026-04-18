#!/bin/bash
echo "Starting crafta.cc..."

# Load .env
if [ -f "$(dirname "$0")/.env" ]; then
  set -a
  source "$(dirname "$0")/.env"
  set +a
fi

# Start MySQL if not already running
brew services start mysql 2>/dev/null

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
until mysql -u root -e "SELECT 1" &>/dev/null; do
  sleep 1
done
echo "MySQL is ready."

# Create database if it doesn't exist
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME:-crafta_cc};"
mysql -u root -e "CREATE USER IF NOT EXISTS '${DB_USER:-wordpress}'@'localhost' IDENTIFIED BY '${DB_PASSWORD:-wordpress_secret_123}';"
mysql -u root -e "GRANT ALL PRIVILEGES ON ${DB_NAME:-crafta_cc}.* TO '${DB_USER:-wordpress}'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

# Start WordPress PHP server
echo "Starting WordPress on http://localhost:8080"
cd "$(dirname "$0")/backend" && php -S localhost:8080 &

# Start Next.js frontend (clear Turbopack cache first to avoid stale CSS/JS)
echo "Starting Next.js on http://localhost:3000"
cd "$(dirname "$0")/frontend" && rm -rf .next/cache && npm run dev
