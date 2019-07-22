CREATE TABLE accounts (
  client_id text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
