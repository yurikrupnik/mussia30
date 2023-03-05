set export
set shell := ["sh", "-c"]
GCP_PROJECT := `gcloud config get-value project`

default:
    @just --list --unsorted

fig-local-cluster:
  rust-cli test
localip:
  localip

# todo with all ts configs!
# https://github.com/stephenh/ts-proto#nestjs-support
# generate rust structs and ts interfaces
proto-generate:
  protoc --rust_out ./libs/rust/grpc/src/generated --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=nestJs=true,addGrpcMetadata=true,addNestjsRestParameter=true --ts_proto_out=./libs/node/grpc/src ./_proto/* --ts_proto_opt=esModuleInterop=true
# daily github actions
daily:
  echo "daily stuff"

#local-mongodb-docker-compose:
#  echo stam
# run mongodb in an k8s cluster
local-cluster-mongodb-docker-compose:
  helm install my-release my-repo/mongodb

run-titl-cluster:
  tilt up

create-local-cluster:
  -ctlptl create cluster kind --registry=ctlptl-registry
  just install-linkerd
  just run-titl-cluster

install-linkerd:
  linkerd install --crds | kubectl apply -f -
  linkerd install | kubectl apply -f -
  linkerd check

install-viz:
  linkerd viz install | kubectl apply -f -
  linkerd viz dashboard &

build-all:
  pnpm nx affected --target=build --parallel --max-parallel=10 --prod

# Check for unused packages.
cargo-unused-deps:
  cargo +nightly udeps --all-targets
