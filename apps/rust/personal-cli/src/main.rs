// use clap::Parser;
// mod gradient;
// mod args;
// use args::Cli;
// mod args;
// mod ;
// use gradient::{GradientOptions, GradientOptions}
// use gen_color::{gradient, Cli, Commands};
// use miette::{Context, Result};
use miette::{Result};
// use owo_colors::OwoColorize;
// use rand::Rng;

// #[cfg(feature = "cargo")]

fn main() -> Result<()> {
  // let cli = Cli::parse();
  // let cmd = clap::Command::new("dam")
  //   .bin_name("dam")
  //   .subcommand_required(true);
  //   // .subcommand(
  //   //   clap::command!("example").arg(
  //   //     clap::arg!(--"manifest-path" <PATH>)
  //   //       .value_parser(clap::value_parser!(std::path::PathBuf)),
  //   //   ),
  //   // );
  // let matches = cmd.get_matches();
  // let matches = match matches.subcommand() {
  //   Some(("example", matches)) => matches,
  //   _ => unreachable!("clap should ensure we don't get here"),
  // };
  // let manifest_path = matches.get_one::<std::path::PathBuf>("manifest-path");
  // println!("{:?}", manifest_path);
  println!("hello word");
  Ok(())
  // match &cli.command {
    // Commands::Gradient(gradient_options) => {
    //   gradient::generate(gradient_options)
    //     .wrap_err("when generating gradient")
    // }
    // Commands::Random => {
    //   let mut rng = rand::thread_rng();
    //
    //   let color = owo_colors::Rgb(l
    //     rng.gen_range(0..255),
    //     rng.gen_range(0..255),
    //     rng.gen_range(0..255),
    //   );
    //   let debug_str = "    ";
    //   print!(
    //     "{} #{:x}{:x}{:x}",
    //     debug_str.on_color(color),
    //     color.0,
    //     color.1,
    //     color.2
    //   );
    //   Ok(())
    // }
  // }
}
