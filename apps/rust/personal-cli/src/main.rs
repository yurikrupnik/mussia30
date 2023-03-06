use clap::Parser;
mod gradient;
// use gradient::{GradientOptions, GradientOptions}
// use gen_color::{gradient, Cli, Commands};
use miette::{Context, Result};
use owo_colors::OwoColorize;
use rand::Rng;

fn main() -> Result<()> {
  // let cli = Cli::parse();

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
    //   let color = owo_colors::Rgb(
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
