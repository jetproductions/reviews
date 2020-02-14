#!/bin/bash
 
###################################################
# Bash script to execute psql command 
###################################################

#Set the value of variable
database="reviews"
user="tthenne"
file="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/reviews.csv"

lastId=$(psql -U $user -d $database -t -c "SELECT id FROM reviews ORDER BY id DESC LIMIT 1;")
((lastId=lastId + 1))

psql -U $user -d $database -c "ALTER SEQUENCE reviews_id_seq RESTART WITH $lastId;"

psql -U $user -d $database -c "COPY reviews(product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '$file' CSV HEADER;" 