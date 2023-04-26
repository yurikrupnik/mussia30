## Golang
#load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
#
#http_archive(
#    name = "io_bazel_rules_go",
#    sha256 = "19ef30b21eae581177e0028f6f4b1f54c66467017be33d211ab6fc81da01ea4d",
#    urls = [
#        "https://mirror.bazel.build.yaml/github.com/bazelbuild/rules_go/releases/download/v0.38.0/rules_go-v0.38.0.zip",
#        "https://github.com/bazelbuild/rules_go/releases/download/v0.38.0/rules_go-v0.38.0.zip",
#    ],
#)
#
#load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")
#
#go_rules_dependencies()
#
#go_register_toolchains(version = "1.19.3")
#
#
## Node
## Deno
#http_archive(
#    name = "aspect_rules_deno",
#    sha256 = "cfda7aeb308082a4525f391b66e81d4f15bd05c3f0a5131e4645e74ea1e32760",
#    strip_prefix = "rules_deno-0.3.0",
#    url = "https://github.com/aspect-build.yaml/rules_deno/archive/refs/tags/v0.3.0.tar.gz",
#)
#
#######################
## rules_deno setup #
#######################
#
#load(
#    "@aspect_rules_deno//deno:repositories.bzl",
#    "LATEST_VERSION",
#    "deno_register_toolchains",
#    "rules_deno_dependencies",
#)
#
## Fetches the rules_deno dependencies.
## If you want to have a different version of some dependency,
## you should fetch it *before* calling this.
## Alternatively, you can skip calling this function, so long as you've
## already fetched all the dependencies.
#rules_deno_dependencies()
#
#deno_register_toolchains(
#    name = "deno",
#    deno_version = LATEST_VERSION,
#)
## Rust
#http_archive(
#    name = "rules_rust",
#    sha256 = "dc8d79fe9a5beb79d93e482eb807266a0e066e97a7b8c48d43ecf91f32a3a8f3",
#    urls = ["https://github.com/bazelbuild/rules_rust/releases/download/0.19.0/rules_rust-v0.19.0.tar.gz"],
#)
#load("@rules_rust//rust:repositories.bzl", "rust_repositories", "rust_register_toolchains", "rust_repository_set")
#rust_repositories(edition="2021")
#rust_register_toolchains()
##load("//cargo:crates.bzl", "raze_fetch_remote_crates")
#
## Note that this method's name depends on your gen_workspace_prefix setting.
## `raze` is the default prefix.
##raze_fetch_remote_crates()
## image
#http_archive(
#    name = "io_bazel_rules_docker",
#    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
#    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
#)
#
