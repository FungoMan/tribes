FROM node:16-alpine as builder
EXPOSE 3000
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build

CMD ["yarn", "start"]
