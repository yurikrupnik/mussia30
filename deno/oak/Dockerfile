FROM denoland/deno:alpine AS deno
# The port that your application listens to.
EXPOSE 1993
WORKDIR /app
# Prefer not to run as root.
USER deno
# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deno.json .
#RUN deno cache deno.json
COPY $DIST_PATH ./app
COPY _proto ./app
# COPY main.ts .
# These steps will be re-run upon each file change in your working directory:
#ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts
ENV PORT=8080
EXPOSE ${PORT}
CMD ["run", "--allow-net", "main.ts"]
