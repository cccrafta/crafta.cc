#!/bin/bash
set -e

gcloud run services update crafta-wp \
  --region=europe-west4 \
  --update-env-vars="WP_HOME=https://crafta-wp-523001806622.europe-west4.run.app"
