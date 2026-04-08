-- Migration: update SUBMISSION table
--   1. file_path (VARCHAR) → file (BYTEA) + file_type (VARCHAR) if not yet migrated
--   2. Widen file_type to VARCHAR(100) — the XLSX MIME type is 65 characters, which
--      exceeds the old VARCHAR(50) limit and causes "value too long" (pg code 22001).
-- Safe to re-run: each step uses IF EXISTS / IF NOT EXISTS guards.

BEGIN;

-- Remove legacy rows that only have a file_path value (no binary content to migrate)
DELETE FROM submission
WHERE file_path IS NOT NULL;

-- Drop old column (no-op if already removed)
ALTER TABLE submission DROP COLUMN IF EXISTS file_path;

-- Add new columns if they don't already exist
ALTER TABLE submission ADD COLUMN IF NOT EXISTS file      BYTEA        NOT NULL DEFAULT '\x'::BYTEA;
ALTER TABLE submission ADD COLUMN IF NOT EXISTS file_type VARCHAR(100);

-- Remove the placeholder default now that the column exists
ALTER TABLE submission ALTER COLUMN file DROP DEFAULT;

-- Widen file_type if it was previously created as VARCHAR(50)
ALTER TABLE submission ALTER COLUMN file_type TYPE VARCHAR(100);

COMMIT;
