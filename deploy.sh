#!/bin/bash
set -e

gcloud run deploy crafta-wp \
  --image=europe-west4-docker.pkg.dev/crafta-cc/crafta/crafta-wp:v1 \
  --region=europe-west4 \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --min-instances=0 \
  --max-instances=2 \
  --add-cloudsql-instances=crafta-cc:europe-west4:crafta-db \
  --set-env-vars="DB_NAME=crafta_cc,DB_USER=wordpress,CLOUD_SQL_CONNECTION_NAME=crafta-cc:europe-west4:crafta-db,WP_ENVIRONMENT_TYPE=production,CORS_ALLOWED_ORIGIN=https://crafta.cc" \
  --set-secrets="DB_PASSWORD=db-password:latest"
