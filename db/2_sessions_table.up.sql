CREATE TABLE sessions (
  id text PRIMARY KEY,
  client_id text NOT NULL,
  path text NOT NULL,
  timestamp bigint NOT NULL,
  user_agent text NOT NULL,
  url text NOT NULL
);

CREATE FUNCTION on_sessions_insert() RETURNS TRIGGER AS $$
  BEGIN
    PERFORM pg_notify('sessions_insert', row_to_json(NEW)::text);
    RETURN NULL;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sessions_insert AFTER INSERT ON sessions FOR EACH ROW EXECUTE FUNCTION on_sessions_insert();
