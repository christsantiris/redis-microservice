FROM node:lts-stretch-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN yarn
COPY . .
RUN npm run build


FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN yarn
COPY --from=build /usr/src/app/dist ./
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]