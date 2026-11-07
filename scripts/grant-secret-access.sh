#!/bin/bash
set -e

gcloud projects add-iam-policy-binding crafta-cc \
  --member="serviceAccount:523001806622-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
