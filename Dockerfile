### STAGE 1: Build ###
FROM node:latest
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install pm2 -g
COPY ./server /usr/src/app