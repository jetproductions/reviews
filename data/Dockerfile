FROM postgres
RUN mkdir /var/data
WORKDIR /var/data
RUN git clone https://github.com/jetproductions/reviews.git
WORKDIR /var/data/reviews/data
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
COPY seed.sh /docker-entrypoint-initdb.d/seed.sh