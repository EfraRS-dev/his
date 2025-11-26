FROM node:20-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps/triage ./apps/triage

RUN npm install

RUN npx prisma generate --schema=apps/triage/prisma/schema.prisma

RUN npx nest build triage

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY --from=development /usr/src/app/package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=development /usr/src/app/dist ./dist

# Copy the generated Prisma client
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copy the Prisma schema
COPY --from=development /usr/src/app/apps/triage/prisma ./apps/triage/prisma

EXPOSE 3000
CMD ["node", "dist/apps/triage/main.js"]