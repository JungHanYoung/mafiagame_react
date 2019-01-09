FROM node:10.15-slim

WORKDIR /app

COPY build /app

RUN npm install -g serve

EXPOSE 5000

ENTRYPOINT [ "serve", "-s" ]