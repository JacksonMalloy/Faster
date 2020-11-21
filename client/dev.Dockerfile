FROM node:13-alpine As base

WORKDIR /app

#---------- PRE-REQS ----------
FROM base AS prereq

COPY ./package.json .

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=production

COPY .babelrc .
COPY jsconfig.json .
COPY next.config.js .
COPY ./tsconfig.json .

# TODO: Change to src
COPY pages ./pages
COPY public ./public
COPY lib ./lib
COPY components ./components
COPY fonts ./fonts
COPY graphql ./graphql
COPY assets ./assets
COPY utils ./utils

#---------- DEVELOPMENT ----------
FROM prereq AS development

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=development

EXPOSE 80

CMD [ "npm", "run", "dev" ]