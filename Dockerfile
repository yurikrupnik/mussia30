
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

FROM denoland/deno:alpine AS deno
# The port that your application listens to.
EXPOSE 1993
WORKDIR /app
# Prefer not to run as root.
USER deno
# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY import_map.json .
RUN deno cache import_map.json
COPY main.ts .
# These steps will be re-run upon each file change in your working directory:
#ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts
ENV PORT=8080
EXPOSE ${PORT}
CMD ["run", "--allow-net", "main.ts"]


FROM debian:buster-slim AS rust
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY $DIST_PATH /bin/app
ENV PORT=8080
EXPOSE ${PORT}
CMD app

#FROM rust AS rust-app
##RUN apt update && apt upgrade
##RUN apt install curl -y
##RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
##RUN apt-get install nodejs
##RUN apt-get install build-essential -y
##RUN npm i -g pnpm
#WORKDIR /app
##COPY package.json .
##COPY pnpm-lock.yaml .
###RUN pnpm i
#COPY . .
#RUN cargo build --release --bin api_rest
##ENV PORT=8080
##EXPOSE ${PORT}
##RUN curl https://sh.rustup.rs -sSf | sh
##RUN pnpm nx run api_rest:build --prod
#
#
#FROM debian:buster-slim AS rust-final
#COPY --from=rust-app app/target/release/api_rest ./bin/app
#ENV PORT=8080
#EXPOSE ${PORT}
#CMD app
