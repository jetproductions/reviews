DROP DATABASE reviews;

CREATE DATABASE reviews WITH OWNER = reviews;

\c reviews;

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date DATE,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness SMALLINT
);

-- CREATE TABLE temp (
--   id BIGINT,
--   product_id INTEGER NOT NULL,
--   rating INTEGER,
--   date DATE,
--   summary VARCHAR,
--   body VARCHAR,
--   recommend BOOLEAN,
--   reported BOOLEAN DEFAULT FALSE,
--   reviewer_name VARCHAR,
--   reviewer_email VARCHAR,
--   response VARCHAR,
--   helpfulness SMALLINT
-- );

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL, 
  name VARCHAR
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  url VARCHAR
);