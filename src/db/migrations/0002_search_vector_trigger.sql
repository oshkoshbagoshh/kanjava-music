-- Maintain search_vector from title, description, and tags.
-- Tags are weighted higher (A) so genre/style queries rank well.

CREATE OR REPLACE FUNCTION resources_search_vector_update() RETURNS trigger AS $$
DECLARE
  tag_text text;
BEGIN
  SELECT coalesce(string_agg(rt.tag, ' '), '')
  INTO tag_text
  FROM resource_tags rt
  WHERE rt.resource_id = NEW.id;

  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(tag_text, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B');

  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER resources_search_vector_trigger
  BEFORE INSERT OR UPDATE OF title, description ON resources
  FOR EACH ROW
  EXECUTE FUNCTION resources_search_vector_update();

-- When tags change, refresh the parent resource search_vector.
CREATE OR REPLACE FUNCTION resource_tags_search_vector_refresh() RETURNS trigger AS $$
DECLARE
  rid uuid;
  tag_text text;
BEGIN
  rid := COALESCE(NEW.resource_id, OLD.resource_id);

  SELECT coalesce(string_agg(rt.tag, ' '), '')
  INTO tag_text
  FROM resource_tags rt
  WHERE rt.resource_id = rid;

  UPDATE resources
  SET
    search_vector =
      setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(tag_text, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(description, '')), 'B'),
    updated_at = now()
  WHERE id = rid;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER resource_tags_search_vector_trigger
  AFTER INSERT OR UPDATE OR DELETE ON resource_tags
  FOR EACH ROW
  EXECUTE FUNCTION resource_tags_search_vector_refresh();
