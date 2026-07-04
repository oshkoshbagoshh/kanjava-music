CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TYPE resource_type AS ENUM ('sample', 'loop', 'midi', 'preset', 'one_shot');
CREATE TYPE license_type AS ENUM (
  'royalty_free_standard',
  'royalty_free_exclusive',
  'cc0',
  'cc_by'
);
CREATE TYPE resource_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE producers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar(64) NOT NULL UNIQUE,
  display_name varchar(128) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  password_hash text NOT NULL,
  bio text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id uuid NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  description text,
  type resource_type NOT NULL,
  file_url text NOT NULL,
  file_hash varchar(64) NOT NULL,
  preview_url text,
  waveform_json_url text,
  duration_ms integer,
  bpm integer,
  musical_key varchar(8),
  license_type license_type NOT NULL DEFAULT 'royalty_free_standard',
  price_cents integer,
  download_count integer NOT NULL DEFAULT 0,
  play_count integer NOT NULL DEFAULT 0,
  fingerprint_hash varchar(128),
  status resource_status NOT NULL DEFAULT 'pending',
  search_vector tsvector,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX resources_status_created_idx ON resources (status, created_at DESC);
CREATE INDEX resources_bpm_idx ON resources (bpm);
CREATE INDEX resources_musical_key_idx ON resources (musical_key);
CREATE INDEX resources_type_idx ON resources (type);
CREATE INDEX resources_producer_id_idx ON resources (producer_id);
CREATE INDEX resources_file_hash_idx ON resources (file_hash);
CREATE INDEX resources_search_vector_idx ON resources USING GIN (search_vector);
CREATE INDEX resources_title_trgm_idx ON resources USING GIN (title gin_trgm_ops);

CREATE TABLE resource_tags (
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  tag varchar(64) NOT NULL,
  weight integer NOT NULL DEFAULT 1,
  PRIMARY KEY (resource_id, tag)
);

CREATE INDEX resource_tags_tag_idx ON resource_tags (tag);

CREATE TABLE downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  downloader_id uuid REFERENCES producers(id) ON DELETE SET NULL,
  license_snapshot_json jsonb NOT NULL,
  downloaded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE upload_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id uuid NOT NULL REFERENCES producers(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  agreement_version varchar(32) NOT NULL,
  accepted_at timestamptz NOT NULL DEFAULT now()
);
