FROM node:20-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps/api-gateway ./apps/api-gateway

RUN npm install

RUN npx nest build api-gateway

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./
RUN npm install --omit=dev

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/apps/api-gateway/main.js"]