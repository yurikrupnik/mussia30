set export
set shell := ["fish", "-c"]

default:
    @just --list --unsorted

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

# Todo
# convert go struct to ts
# https://github.com/tkrajina/typescriptify-golang-structs
