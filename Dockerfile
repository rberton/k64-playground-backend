# BASE
FROM node:12.18.3-alpine3.12

LABEL Maintainer="Romain Berton <romain.berton.dev@gmail.com>"

RUN apk update; \
    apk upgrade; \
    apk add bash; \
    adduser --disabled-password k64; \
    mkdir /home/k64/www; \
    npm i -g pm2;

ENV HOME /home/k64

# backend
COPY $PWD $HOME/www/backend/
COPY $PWD/config/.env.prod $HOME/www/backend/.env

WORKDIR $HOME/www/backend

RUN yarn

EXPOSE 10002

# RUN COMMAND
CMD ["pm2-runtime", "start", "yarn", "--name", "backend", "--interpreter", "bash", "--", "start"]
