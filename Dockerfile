
# Done!
FROM node:18-alpine AS node
WORKDIR /app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ENV NODE_ENV=$NODE_ENV
COPY ./$DIST_PATH .
RUN npm install
ENV PORT=8080
EXPOSE ${PORT}
CMD ["node", "main.js"]

# Done
FROM nginx:alpine AS nginx
WORKDIR /app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY ./$DIST_PATH /usr/share/nginx/html
ENV PORT=80
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]

# Done
FROM scratch AS scratch
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ARG ENTRY_NAME=app
ENV PORT=8080
COPY $DIST_PATH ./app
EXPOSE ${PORT}
ENTRYPOINT ["/app"]

# Done
FROM alpine AS alpine
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ARG ENTRY_NAME=app
ENV PORT=8080
COPY $DIST_PATH ./app
EXPOSE ${PORT}
ENTRYPOINT ["/app"]


#FROM debian:buster-slim AS rust
FROM ubuntu AS rust
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY $DIST_PATH ./app
ENV PORT=8080
EXPOSE ${PORT}
CMD ["./app"]

FROM rust:latest AS builder
WORKDIR /app
COPY . .
RUN cd apps/rust/api-rest
RUN cargo build --release

FROM ubuntu:latest AS rust-test
COPY --from=builder /app/target/release/api_rest ./app
ENV PORT=8080
EXPOSE ${PORT}
CMD ["./app"]
