## To run project:
### `npm i`
### `npm start`

## To run the project in debug mode:
### `npm i`
### `npm run start:debug`
### `cmd + shift + p` then choose `attach to node process`
### pick the first option node <path> process Id <id>
### add breakpoints in vs code and start debugging

## To run as docker container: 
### `docker compose build` then `docker compose up`

##   For use with below in .env file to point to mongo atlas:
### `ENV_NAME=development`
### `MONGO_HOST=<your host>`
### `JWT_KEY=secret`

## To install and run redis: 
### `brew install redis`
### `brew services start redis`

## To confirm redis is running:
### `redis-cli ping` 

## To validate keys are present in redis: 
### `redis-cli get <key>`

## To remove key from redis: 
### `redis-cli del <key>`

## To empty entire redis cache: 
### `redis-cli flushall`

## Notes: 
### A microservice does not necessarily need authentication, but I added it to demonstrate how it could work