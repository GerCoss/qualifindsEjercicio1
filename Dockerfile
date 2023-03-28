FROM node:14.16.0-buster-slim@sha256:ffc15488e56d99dbc9b90d496aaf47901c6a940c077bc542f675ae351e769a12

WORKDIR /app

RUN mkdir output

COPY package*.json ./

RUN npm i

COPY ejercicio1.js ./

CMD node ejercicio1.js

