FROM node:13-alpine As base

WORKDIR /app

#---------- PRE-REQS ----------
FROM base AS prereq

COPY ./package.json .

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=production

COPY ./tsconfig.json .
COPY src ./src
COPY public ./public

#---------- DEVELOPMENT ----------
FROM prereq AS development

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=development

EXPOSE 80

CMD ["npm", "start"]