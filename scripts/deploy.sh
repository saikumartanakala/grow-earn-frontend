#!/usr/bin/env bash
set -euo pipefail
# Simple deploy script for Linux servers using rsync over SSH
# Usage example:
# REMOTE_USER=user REMOTE_HOST=host REMOTE_DIR=/var/www/grow-earn-frontend ./scripts/deploy.sh

: "${REMOTE_USER:?Need REMOTE_USER}"
: "${REMOTE_HOST:?Need REMOTE_HOST}"
REMOTE_DIR=${REMOTE_DIR:-/var/www/grow-earn-frontend}
SSH_PORT=${SSH_PORT:-22}

echo "Installing dependencies..."
npm ci

echo "Building production assets..."
npm run build

echo "Syncing dist/ to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR} (port ${SSH_PORT})"
rsync -avz --delete -e "ssh -p ${SSH_PORT}" dist/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"

echo "Deployment complete."
