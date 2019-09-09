# Tread Realtime

## Local development

### Setup

```sh
yarn
```

### Run

```sh
yarn start
```

## Build Docker image

```sh
docker build -t treadfyi/tread-realtime .
```

## Push Docker image

```sh
docker push treadfyi/tread-realtime
```

## Run Docker image in container

```sh
docker run --detach --env-file env.list --rm treadfyi/tread-realtime
```
