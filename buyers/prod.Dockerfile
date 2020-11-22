# TODO

FROM node:13-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY pages ./pages
COPY public ./public
COPY lib ./lib

CMD [ "npm", "run", "prod" ]