set export
set shell := ["sh", "-c"]
GCP_PROJECT := `gcloud config get-value project`

default:
    @just --list --unsorted

# todo with all ts configs!
# https://github.com/stephenh/ts-proto#nestjs-support
# generate rust structs and ts interfaces
proto-generate:
  protoc --rust_out ./libs/rust/grpc/src/generated --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_opt=nestJs=true,addGrpcMetadata=true,addNestjsRestParameter=true --ts_proto_out=./libs/node/grpc/src ./_proto/* --ts_proto_opt=esModuleInterop=true
# daily github actions
daily:
  echo "daily stuff"

#local-mongodb-docker-compose:
# §§§§§§§§§§§§§§§§§§§§§ echo stam
# run mongodb in an k8s cluster

run-titl-cluster:
  tilt up

host:
  uname
# Run ctlptl create cluster with kind, default is kind
ds:
  echo $1
  echo $2
  ctlptl create cluster k3d --registry=ctlptl-registry

delete-local-cluster:
  -ctlptl delete cluster $name

create-local-cluster:
  -ctlptl create cluster k3d --registry=ctlptl-registry
  just install-argocd
  just run-titl-cluster
#  just install-linkerd
#  just install-istio
#  just local-cluster-mongodb-docker-compose

recreate-local-cluster:
  -tilt down
  -ctlptl delete cluster k3d
  just create-local-cluster

install-dapr:
  helm install dapr dapr/dapr --namespace dapr-system --set global.mtls.enabled=false

install-istio:
  istioctl install --set profile=default -y # change this to helm
  kubectl label namespace default istio-injection=enabled

install-linkerd:
  linkerd install --crds | kubectl apply -f -
  linkerd install | kubectl apply -f -
  linkerd check


install-viz:
  linkerd viz install | kubectl apply -f -
  linkerd viz dashboard &

build-all:
  pnpm nx affected --target=build --parallel --max-parallel=10 --prod

local-cluster-mongodb-docker-compose:
  helm install my-release my-repo/mongodb

install-argocd:
  kubectl create namespace argocd
  kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# Check for unused packages.
cargo-unused-deps:
  cargo +nightly udeps --all-targets
