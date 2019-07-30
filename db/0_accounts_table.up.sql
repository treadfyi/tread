CREATE TABLE accounts (
  client_id text PRIMARY KEY,
  github_id int,
  created_at timestamptz NOT NULL DEFAULT now()
);
