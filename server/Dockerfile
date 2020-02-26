### STAGE 1: Build ###
FROM node:latest
WORKDIR /usr/src
RUN git clone https://github.com/jetproductions/reviews.git
WORKDIR /usr/src/reviews
RUN npm install --silent
RUN npm install pm2 -g
WORKDIR /usr/src/reviews/server