# Dockerfile for Users microservice
FROM node:20-alpine
WORKDIR /app
COPY ../../.. .
WORKDIR /app/apps/users
RUN npm install --omit=dev
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]