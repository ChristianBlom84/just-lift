FROM mhart/alpine-node:latest

# Create and define the node_modules's cache directory.
RUN mkdir /usr/cache
WORKDIR /usr/cache

COPY package.json ./
COPY package-lock.json ./
RUN npm install

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN mkdir /usr/app
WORKDIR /usr/app

COPY entrypoint.sh ./
RUN chmod +x /usr/app/entrypoint.sh

RUN apk add --no-cache bash
