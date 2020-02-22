#!/bin/bash
set -e

reviews="/var/data/reviews.csv"
photos="/var/data/reviews_photos.csv"
characteristics="/var/data/characteristics.csv"
characteristics_reviews="/var/data/characteristics_reviews.csv"

PGPASSWORD=$POSTGRES_PASSWORD
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "reviews" <<-EOSQL
  COPY reviews FROM '$reviews' CSV HEADER; 
  SELECT setval('reviews_id_seq', (SELECT MAX(id)+1 FROM reviews), false);

  COPY reviews_photos FROM '$photos' CSV HEADER; 
  SELECT setval('reviews_photos_id_seq', (SELECT MAX(id)+1 FROM reviews_photos), false);

  COPY characteristics FROM '$characteristics' CSV HEADER; 
  SELECT setval('characteristics_id_seq', (SELECT MAX(id)+1 FROM characteristics), false);

  COPY characteristics_reviews FROM '$characteristics_reviews' CSV HEADER; 
  SELECT setval('characteristics_reviews_id_seq', (SELECT MAX(id)+1 FROM characteristics_reviews), false);
EOSQL
