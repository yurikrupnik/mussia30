#def write_new_file_impl(ctx):
##  output_file = ctx.actions.declare_file(ctx.attr.out_file_name + ".txt")
#  ctx.actions.run(
#    outputs = [output_file],
#    inputs = [ctx.file.my_input_file],
##    executable = "cmd.exe",
##    executable = ctx.executable.,
##    arguments = ["/c", "type", ctx.file.my_input_file, ">>", output_file.path]
#  )
##  return DefaultInfo(files = depset([output_file]))
##  pass
#
#write_new_file = rule(
#  implementation = write_new_file_impl,
#  attrs = {
#    "my_input_file": attr.label(allow_single_file = True),
#    "out_file_name": attr.string()
#  }
#)
#
##write_new_file = rule(
##  implementation = write_new_file_impl,
##  attrs = {
##    "my_input_file": attr.label(allow_single_file = True),
##    "out_file_name": attr.string()
##  }
##)
load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")

#rules_rust_dependencies()
#
#rust_register_toolchains()
#container_image(
#    name = "helloworld",
#)
