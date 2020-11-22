FROM node:12-alpine AS base

WORKDIR /app

#---------- PRE-REQS ----------
FROM base AS prereq

COPY ./package.json .
COPY ./nodemon.json .
COPY ./tsconfig.json .
COPY ./jest.config.js .

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=production

#---------- DEVELOPMENT ----------
FROM prereq AS development

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=development

CMD [ "npm", "run", "start:dev" ]