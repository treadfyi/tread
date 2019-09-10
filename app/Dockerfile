FROM node:12-alpine as builder
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 3000

CMD ["yarn", "now:dev"]
