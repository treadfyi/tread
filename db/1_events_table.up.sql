CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  path text NOT NULL,
  session_id text NOT NULL,
  target_class_name text NOT NULL,
  target_id text NOT NULL,
  target_node_name text NOT NULL,
  target_text_content text NOT NULL,
  timestamp bigint NOT NULL,
  type text NOT NULL,
  url text NOT NULL
);
