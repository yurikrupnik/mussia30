// mods
mod product;
// libs for app
use product::{
    add_product, delete_product, delete_products, get_product, get_products, update_product,
};
// core
use actix_web::{middleware::Logger, web, App, HttpServer};
use env_logger::Env;
use mongodb::Client;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "debug");
    env::set_var("RUST_BACKTRACE", "1");
    // env_logger::init();

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    // let collection: Collection<Product> = client.database(db_name).collection(coll_name);

    // data here
    let client_data = web::Data::new(client); // used for product api
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(client_data.clone())
            // .app_data(products_data.clone())
            .service(add_product)
            .service(get_product)
            .service(get_products)
            .service(delete_product)
            .service(delete_products)
            .service(update_product)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
