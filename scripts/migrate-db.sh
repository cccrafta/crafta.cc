#!/bin/bash
set -e

BUCKET="crafta-cc-migrate-523001806622"
SQL_SA="p523001806622-t97vuz@gcp-sa-cloud-sql.iam.gserviceaccount.com"

# Dump local DB (--set-gtid-purged=OFF required for Cloud SQL GTID compatibility)
mysqldump -u wordpress -pwordpress_secret_123 --set-gtid-purged=OFF crafta_cc 2>/dev/null > /tmp/crafta_dump.sql

# Create bucket (ignore error if already exists)
gsutil mb -l europe-west4 gs://$BUCKET 2>/dev/null || true

# Grant Cloud SQL permission to read from it
gsutil iam ch serviceAccount:$SQL_SA:objectViewer gs://$BUCKET

# Upload dump
gsutil cp /tmp/crafta_dump.sql gs://$BUCKET/

# Import into Cloud SQL
gcloud sql import sql crafta-db gs://$BUCKET/crafta_dump.sql --database=crafta_cc --quiet

# Cleanup
gsutil rm -r gs://$BUCKET
