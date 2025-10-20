FROM node:20-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY apps/patients ./apps/patients

RUN npm install

RUN npx prisma generate --schema=apps/patients/prisma/schema.prisma

RUN npx nest build patients

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

#Copy package files and install production dependencies
COPY --from=development /usr/src/app/package*.json ./
RUN npm install --omit=dev

#Copy built app
COPY --from=development /usr/src/app/dist ./dist

# Copy the generated Prisma client (custom output)
COPY --from=development /usr/src/app/apps/patients/src/infrastructure/database/generated ./apps/patients/src/infrastructure/database/generated

#Copy the generated Prisma client (both locations)
#COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma efra's ver

#Copy the Prisma schema (needed for some Prisma operations)
COPY --from=development /usr/src/app/apps/patients/prisma ./apps/patients/prisma

EXPOSE 3000
CMD ["node", "dist/apps/patients/main.js"]