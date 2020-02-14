#!/bin/bash
 
###################################################
# Bash script to execute psql command 
###################################################
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
user="tthenne"
database="reviews"
faker="$DIR/faker.csv"
reviews="$DIR/reviews.csv"
reviews_photos="$DIR/reviews_photos.csv"
characteristics="$DIR/characteristics.csv"
characteristics_reviews="$DIR/characteristics_reviews.csv"
# if parameter 1 is not passed as argument default records to be generated to 1000000
records=${1:-1000000}

# Create the database
# Dont specify a database since CREATE DATABASE is in schema.sql
schema="$DIR/schema.sql"
psql -U $user postgres < $schema 

# Need to seed the database
psql -U $user -d $database -c "COPY reviews FROM '$reviews' CSV HEADER;" 
psql -U $user -d $database -c "COPY reviews_photos FROM '$reviews_photos' CSV HEADER;" 
psql -U $user -d $database -c "COPY characteristics FROM '$characteristics' CSV HEADER;" 
psql -U $user -d $database -c "COPY characteristics_reviews FROM '$characteristics_reviews' CSV HEADER;" 

# Run the faker generator sript
node generator.js $records

# Get the last id in the reviews database and increment it by one so we can alter sequence 
lastId=$(psql -U $user -d $database -t -c "SELECT id FROM reviews ORDER BY id DESC LIMIT 1;")
((lastId=lastId + 1))
# Alter the sequence to restart count from lastId
psql -U $user -d $database -c "ALTER SEQUENCE reviews_id_seq RESTART WITH $lastId;"

psql -U $user -d $database -c "COPY reviews(product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '$faker' CSV HEADER;" 