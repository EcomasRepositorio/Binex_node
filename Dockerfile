# Etapa de construcción
FROM node:20-alpine3.18 AS base

ENV DIR /app
WORKDIR $DIR

FROM base AS build

RUN apk update && apk add --no-cache dumb-init
COPY package*.json $DIR
RUN npm ci
COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN npx prisma generate

FROM base AS production
ENV NODE_ENV=production
WORKDIR $DIR
COPY --from=build $DIR/ .
EXPOSE 8000

CMD ["npm", "start"]

#RUN npm run build && \
#    npm prune --production
#COPY --from=build /usr/bin/dump-init /usr/bin/dump-init
#COPY --from=build $DIR/node_modules $DIR/node_modules
#COPY --from=build $DIR/dist $DIR/dist