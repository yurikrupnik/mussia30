// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust and leptos!", name)
}

#[tauri::command]
fn kind(name: &str) -> String {
    use std::process::Command;
    // let task1 = Command::new("kind").args(["create", "cluster"])
    // let task1 = Command::new("kubectl").args(["cluster-info"])
    // .spawn()
    // // .wait()
    // .expect("failed to create kind cluster");
    let task1 = Command::new("ls").spawn().expect("failed ls");
    let task12 = Command::new("kubectx").spawn().expect("failed kubectx");
  format!("Hello, You've been greeted from Rust and leptos!")
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
          greet,
          kind
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
