CREATE TABLE sessions (
  id text PRIMARY KEY,
  client_id text NOT NULL,
  path text NOT NULL,
  timestamp bigint NOT NULL,
  user_agent text NOT NULL,
  url text NOT NULL
);
