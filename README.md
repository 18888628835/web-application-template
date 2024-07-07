# How to use this template

## Getting Started

### Build with docker

build **Web** app in beta environment

```shell
docker build -f apps/web/Dockerfile . -t web --build-arg BUILD_ENV=beta
```
