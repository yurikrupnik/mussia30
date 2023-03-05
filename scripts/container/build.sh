#! /bin/bash
set -e

docker run \
		-v $HOME/.config/gcloud:/root/.config/gcloud \
		-v $HOME/.config/kaniko/.docker:/root/.config/kaniko.docker \
		-v $PWD/:/workspace \
		gcr.io/kaniko-project/executor:debug \
		--dockerfile /workspace/Dockerfile \
		--destination "yurikrupnik/node-api-rest" \
		--build-arg "DIST_PATH=dist/apps/node/api-res" \
		--target node

#docker run \
#		-v $HOME/.config/gcloud:/root/.config/gcloud \
#		-v $HOME/.config/kaniko/.docker:/root/.config/kaniko.docker \
#		-v $PWD/:/workspace \
#		gcr.io/kaniko-project/executor:debug \
#		--dockerfile /workspace/Dockerfile \
#		--destination "yurikrupnik/users-api" \
#		--build-arg "DIST_PATH=dist/apps/users/api" \
#		--target node
#
#docker run \
#		-v $HOME/.config/gcloud:/root/.config/gcloud \
#		-v $HOME/.config/kaniko/.docker:/root/.config/kaniko.docker \
#		-v $PWD/:/workspace \
#		gcr.io/kaniko-project/executor:debug \
#		--dockerfile /workspace/Dockerfile \
#		--destination "yurikrupnik/users-api" \
#		--build-arg "DIST_PATH=dist/apps/users/api" \
#		--target deno
