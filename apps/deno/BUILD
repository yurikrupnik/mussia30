load("@aspect_rules_deno//deno:defs.bzl", "deno_binary")

deno_binary(
    name = "example",
    allow = ["write"],
    main = "main.ts",
    unstable_apis = True,
    deps = [
        "helper.ts",
        ":deno_utils",
    ],
)

