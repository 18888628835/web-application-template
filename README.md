# How to use this template

## Getting Started

### Build with docker

build **Web** app in beta environment

```shell
pnpm build:docker:web:beta
```

### Build database containers with docker-compose

Use the following command to run docker container for the 1st time

```shell
docker compose up
```

If you got an error message like:

```shell
/docker-entrypoint-initdb.d/create-user.sh: /bin/bash: bad interpreter: Permission denied
```

You should run the command to give the script permission for executing in docker after removing containers and volumes that was created above.

> run: `docker compose down -v` to remove data volume and restart the containers

```shell
chmod +x ./db-init/create-user.sh
```
