FROM node:13-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY src ./src

CMD [ "npm", "run", "dev" ]