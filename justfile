set export
set shell := ["fish", "-c"]

default:
    @just --list --unsorted

# todo with all ts configs!
# https://github.com/stephenh/ts-proto#nestjs-support
# generate rust structs and ts interfaces
proto-generate:
  protoc --rust_out ./libs/rust/grpc/src/generated --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=nestJs=true,addGrpcMetadata=true,addNestjsRestParameter=true --ts_proto_out=./libs/node/grpc/src ./_proto/* --ts_proto_opt=esModuleInterop=true

create-cluster:
  -ctlptl create cluster kind --registry=ctlptl-registry

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
