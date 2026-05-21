FROM node:20-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps/ehr ./apps/ehr

RUN npm install && \
    npx prisma generate --schema=apps/ehr/prisma/schema.prisma && \
    npx nest build ehr

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

# Copy production dependencies and built app from development stage
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

# Copy the generated Prisma client
COPY --from=development /usr/src/app/apps/ehr/prisma/generated ./apps/ehr/prisma/generated

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/apps/ehr/main.js"]