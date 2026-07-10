-- Phase 2: WMDM-style catalog expansion (genres, DAW, new types, bundles, dual pricing)

ALTER TYPE resource_type ADD VALUE IF NOT EXISTS 'daw_template';
ALTER TYPE resource_type ADD VALUE IF NOT EXISTS 'stem';
ALTER TYPE resource_type ADD VALUE IF NOT EXISTS 'sample_pack';
ALTER TYPE resource_type ADD VALUE IF NOT EXISTS 'vocal_pack';

CREATE TYPE daw_type AS ENUM (
  'ableton_live',
  'logic_pro',
  'fl_studio',
  'cubase',
  'studio_one',
  'bitwig',
  'multi_daw',
  'not_applicable'
);

CREATE TYPE bundle_status AS ENUM ('draft', 'active', 'archived');

ALTER TABLE resources
  ADD COLUMN daw daw_type NOT NULL DEFAULT 'not_applicable',
  ADD COLUMN regular_price_cents integer,
  ADD COLUMN exclusive_price_cents integer;

UPDATE resources SET regular_price_cents = price_cents WHERE price_cents IS NOT NULL;

CREATE INDEX resources_daw_idx ON resources (daw);
CREATE INDEX resources_regular_price_idx ON resources (regular_price_cents);

CREATE TABLE genres (
  slug varchar(64) PRIMARY KEY,
  name varchar(128) NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE resource_genres (
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  genre_slug varchar(64) NOT NULL REFERENCES genres(slug) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, genre_slug)
);

CREATE INDEX resource_genres_genre_slug_idx ON resource_genres (genre_slug);

CREATE TABLE bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(128) NOT NULL UNIQUE,
  title varchar(255) NOT NULL,
  description text,
  regular_price_cents integer NOT NULL,
  compare_at_price_cents integer,
  status bundle_status NOT NULL DEFAULT 'draft',
  cover_image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX bundles_status_idx ON bundles (status);

CREATE TABLE bundle_items (
  bundle_id uuid NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (bundle_id, resource_id)
);

CREATE INDEX bundle_items_bundle_id_idx ON bundle_items (bundle_id);

-- Seed genres (WMDM-style taxonomy)
INSERT INTO genres (slug, name, sort_order) VALUES
  ('house', 'House', 10),
  ('deep_house', 'Deep House', 20),
  ('tech_house', 'Tech House', 30),
  ('progressive_house', 'Progressive House', 40),
  ('melodic_techno', 'Melodic Techno', 50),
  ('techno', 'Techno', 60),
  ('trance', 'Trance', 70),
  ('progressive_trance', 'Progressive Trance', 80),
  ('dub_techno', 'Dub Techno', 90),
  ('afro_house', 'Afro House', 100),
  ('organic_house', 'Organic House', 110),
  ('electro_house', 'Electro House', 120),
  ('big_room', 'Big Room', 130),
  ('drum_and_bass', 'Drum & Bass', 140),
  ('hip_hop', 'Hip Hop', 150),
  ('pop', 'Pop', 160),
  ('cinematic', 'Cinematic', 170),
  ('ambient', 'Ambient', 180),
  ('breaks', 'Breaks', 190),
  ('garage', 'Garage', 200);

-- Refresh FTS to include genre names
CREATE OR REPLACE FUNCTION resources_search_vector_update() RETURNS trigger AS $$
DECLARE
  tag_text text;
  genre_text text;
BEGIN
  SELECT coalesce(string_agg(rt.tag, ' '), '')
  INTO tag_text
  FROM resource_tags rt
  WHERE rt.resource_id = NEW.id;

  SELECT coalesce(string_agg(g.name, ' '), '')
  INTO genre_text
  FROM resource_genres rg
  INNER JOIN genres g ON g.slug = rg.genre_slug
  WHERE rg.resource_id = NEW.id;

  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(tag_text, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(genre_text, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B');

  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION resource_tags_search_vector_refresh() RETURNS trigger AS $$
DECLARE
  rid uuid;
  tag_text text;
  genre_text text;
BEGIN
  rid := COALESCE(NEW.resource_id, OLD.resource_id);

  SELECT coalesce(string_agg(rt.tag, ' '), '')
  INTO tag_text
  FROM resource_tags rt
  WHERE rt.resource_id = rid;

  SELECT coalesce(string_agg(g.name, ' '), '')
  INTO genre_text
  FROM resource_genres rg
  INNER JOIN genres g ON g.slug = rg.genre_slug
  WHERE rg.resource_id = rid;

  UPDATE resources
  SET
    search_vector =
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(tag_text, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(genre_text, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(description, '')), 'B'),
    updated_at = now()
  WHERE id = rid;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION resource_genres_search_vector_refresh() RETURNS trigger AS $$
DECLARE
  rid uuid;
  tag_text text;
  genre_text text;
BEGIN
  rid := COALESCE(NEW.resource_id, OLD.resource_id);

  SELECT coalesce(string_agg(rt.tag, ' '), '')
  INTO tag_text
  FROM resource_tags rt
  WHERE rt.resource_id = rid;

  SELECT coalesce(string_agg(g.name, ' '), '')
  INTO genre_text
  FROM resource_genres rg
  INNER JOIN genres g ON g.slug = rg.genre_slug
  WHERE rg.resource_id = rid;

  UPDATE resources
  SET
    search_vector =
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(tag_text, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(genre_text, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(description, '')), 'B'),
    updated_at = now()
  WHERE id = rid;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER resource_genres_search_vector_trigger
  AFTER INSERT OR UPDATE OR DELETE ON resource_genres
  FOR EACH ROW
  EXECUTE FUNCTION resource_genres_search_vector_refresh();
