#!/bin/bash
set -e

echo "Setting up crafta.cc..."

# Load .env
if [ -f "$(dirname "$0")/.env" ]; then
  set -a
  source "$(dirname "$0")/.env"
  set +a
fi

# Check prerequisites
missing=()
command -v php &>/dev/null || missing+=("php")
command -v mysql &>/dev/null || missing+=("mysql")
command -v node &>/dev/null || missing+=("node")
command -v npm &>/dev/null || missing+=("npm")

if [ ${#missing[@]} -gt 0 ]; then
  echo "Missing required tools: ${missing[*]}"
  echo "Install them with: brew install ${missing[*]}"
  exit 1
fi

# Download WordPress into backend/ if not present
if [ ! -f "backend/wp-login.php" ]; then
  echo "Downloading WordPress..."
  curl -sL https://wordpress.org/latest.tar.gz -o /tmp/wordpress.tar.gz
  tar -xzf /tmp/wordpress.tar.gz -C /tmp
  # Copy WordPress files without overwriting wp-config.php
  rsync -a --ignore-existing /tmp/wordpress/ backend/
  rm -rf /tmp/wordpress /tmp/wordpress.tar.gz
  echo "WordPress installed in backend/."
else
  echo "WordPress already present in backend/."
fi

# Start MySQL and set up database
echo "Setting up MySQL..."
brew services start mysql 2>/dev/null || true
until mysql -u root -e "SELECT 1" &>/dev/null; do
  sleep 1
done
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME:-crafta_cc};"
mysql -u root -e "CREATE USER IF NOT EXISTS '${DB_USER:-wordpress}'@'localhost' IDENTIFIED BY '${DB_PASSWORD:-wordpress_secret_123}';"
mysql -u root -e "GRANT ALL PRIVILEGES ON ${DB_NAME:-crafta_cc}.* TO '${DB_USER:-wordpress}'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"
echo "Database ready."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd "$(dirname "$0")/frontend" && npm install
cd ..

echo ""
echo "Setup complete! Run ./start.sh to start the project."
