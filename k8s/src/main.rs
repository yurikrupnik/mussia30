use std::fs;
use std::io;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct SalesAndProducts {
  products: Vec<Product>,
  sales: Vec<Sale>
}
#[derive(Deserialize, Serialize, Debug)]
struct Product {
  id: u32,
  category: String,
  name: String
}
#[derive(Deserialize, Serialize, Debug)]
struct Sale {
  id: String,
  // product_id: u32,
  // date: u64,
  quantity: f32,
  unit: String
}

#[derive(Deserialize, Serialize, Debug)]
struct Task {
  version: String,
  // vars:
  // product_id: u32,
  // date: u64,
  quantity: f32,
  unit: String
}

use std::path::Path;


fn main() -> Result<(), io::Error> {
  use std::process::Command;

  Command::new("ls")
    // .current_dir("/")
    .spawn()
    .expect("ls command failed to start");
  // Command::new("ls")
  //   .current_dir("/bin")
  //   .spawn()
  //   .expect("ls command failed to start");
  // Command::new("ls")
  //   .current_dir("/opt/homebrew/bin/")
  //   .spawn()
  //   .expect("ls command failed to start");

  let file_exists = Path::new("Taskfile.yaml").exists();
  if file_exists {
    println!("File exists");
    Command::new("task").args(["-a"])
      .spawn()
      .expect("failed to task all");
  }
  else{
    println!("File does not exist");
  }

  let file_exists = Path::new("../justfile").exists();
  if file_exists {
    println!("justfile File exists");
  }
  else{
    println!("justfile File does not exist");
  }

  let mut list_dir = Command::new("just");
  // Command::new("kubectl");
  // Command::new("task");

// Execute `ls` in the current directory of the program.
  list_dir.status().expect("process failed to execute");

  println!();

// Change `ls` to execute in the root directory.
//   list_dir.current_dir("/");

// And then execute `ls` again but in the root directory.
//   list_dir.status().expect("process failed to execute");
  let mut sales_and_products: SalesAndProducts = {
    // let data = fs::read_to_string("./Taskfile.yaml").expect("LogRocket: error reading file");
    let data = fs::read_to_string("./example-data.json").expect("LogRocket: error reading file");
    serde_json::from_str(&data).unwrap()
  };
  // sales_and_products.sales[0].quantity += 1.5;
  fs::write("./create-file.json", serde_json::to_string_pretty(&sales_and_products).unwrap())?;

  Ok(())
}
