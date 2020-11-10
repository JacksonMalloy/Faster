FROM node:13-alpine

WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY src ./src
COPY public ./public

EXPOSE 80

CMD ["yarn", "start"]