FROM node:20 AS builder

COPY ./package*.json ./
RUN rm -rf ./node_modules
RUN npm cache clean --force
RUN npm install

COPY ./ .

CMD ["npm","run","dev"]