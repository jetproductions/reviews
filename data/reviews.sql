CREATE SEQUENCE reviews_id_seq;

CREATE TABLE reviews (
  id BIGINT NOT NULL PRIMARY KEY DEFAULT nextval('reviews_id_seq'),
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

CREATE TABLE temp (
  id BIGINT,
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