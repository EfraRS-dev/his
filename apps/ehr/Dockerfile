# Dockerfile for EHR microservice
FROM node:20-alpine
WORKDIR /app
COPY ../../.. .
WORKDIR /app/apps/ehr
RUN npm install --omit=dev
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]