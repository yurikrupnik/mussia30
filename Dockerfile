#
## Done!
#FROM node:18-alpine AS node
#WORKDIR /app
#
#ARG DIST_PATH
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
#ENV NODE_ENV=$NODE_ENV
#COPY ./$DIST_PATH .
#RUN npm install
#ENV PORT=8080
#EXPOSE ${PORT}
#CMD ["node", "main.js"]
#
## Done
#FROM nginx:alpine AS nginx
#WORKDIR /app
#ARG DIST_PATH
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
#COPY ./$DIST_PATH /usr/share/nginx/html
#ENV PORT=80
#EXPOSE ${PORT}
#CMD ["nginx", "-g", "daemon off;"]
#
## Done
#FROM scratch AS scratch
#WORKDIR /
#ARG DIST_PATH
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
#ARG ENTRY_NAME=app
#ENV PORT=8080
#COPY $DIST_PATH ./app
#EXPOSE ${PORT}
#ENTRYPOINT ["/app"]
#
## Done
#FROM alpine AS alpine
#WORKDIR /
#ARG DIST_PATH
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
#ARG ENTRY_NAME=app
#ENV PORT=8080
#COPY $DIST_PATH ./app
#EXPOSE ${PORT}
#ENTRYPOINT ["/app"]
#
#FROM denoland/deno:alpine AS deno
## The port that your application listens to.
#EXPOSE 1993
#WORKDIR /app
## Prefer not to run as root.
#USER deno
## Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
## Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
#COPY import_map.json .
#RUN deno cache import_map.json
#COPY main.ts .
## These steps will be re-run upon each file change in your working directory:
##ADD . .
## Compile the main app so that it doesn't need to be compiled each startup/entry.
#RUN deno cache main.ts
#ENV PORT=8080
#EXPOSE ${PORT}
#CMD ["run", "--allow-net", "main.ts"]
#
#
#FROM debian:buster-slim AS rust
#WORKDIR /
#ARG DIST_PATH
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
#COPY $DIST_PATH /bin/app
#ENV PORT=8080
#EXPOSE ${PORT}
#CMD app


#FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
#WORKDIR app
#FROM chef AS planner
#COPY . .
#RUN cargo chef prepare --recipe-path recipe.json
#FROM chef AS builder
#COPY --from=planner /app/recipe.json recipe.json
## Build dependencies - this is the caching Docker layer!
#RUN cargo chef cook --release --recipe-path recipe.json
## Build application
#COPY . .
#RUN cargo build --release --bin api_rest
# Using the `rust-musl-builder` as base image, instead of
# the official Rust toolchain
FROM clux/muslrust:stable AS chef
USER root
RUN cargo install cargo-chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
# Notice that we are specifying the --target flag!
RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl --bin app

FROM alpine AS runtime
RUN addgroup -S myuser && adduser -S myuser -G myuser
# We do not need the Rust toolchain to run the binary!
#FROM debian:buster-slim AS runtime
WORKDIR app
COPY --from=builder /app/target/release/api_rest /usr/local/bin
ENTRYPOINT ["/usr/local/bin/app"]

#FROM ubuntu AS cli
#FROM alpine AS cli
#RUN  curl google.com
#RUN #apt-get install curl
#RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
#RUN apt-get install speedtest
#CMD ["./speedtest"]
