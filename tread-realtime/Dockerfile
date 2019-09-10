FROM node:12-alpine as builder
COPY . /tread-realtime
WORKDIR /tread-realtime
RUN yarn
EXPOSE 8080

CMD ["yarn", "start"]
