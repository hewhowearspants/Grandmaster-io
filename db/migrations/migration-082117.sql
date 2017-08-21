\c dream_team_dev;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  display_name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  class VARCHAR(255),
  attack INTEGER,
  defense INTEGER,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  class VARCHAR(255),
  attack INTEGER,
  defense INTEGER
);
