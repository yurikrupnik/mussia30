//! Example code for using MongoDB with Actix.
extern crate core;

mod model;
mod product;
mod random;
#[cfg(test)]
mod test;
mod todo;
mod user;

use actix_web::{
    delete, get, guard, http, middleware::Logger, post, web, App, HttpRequest, HttpResponse,
    HttpServer, Responder, Result, Route,
};
use model::MongoRepo;
use product::{
    add_product, delete_product, get_product, get_products, update_product, Product,
    DB_NAME as db_name,
};
use random::{config, general_routes};
use user::User;
// use todo::todos_config;
use mongodb::bson::extjson::de::Error;
use mongodb::{bson, bson::doc, Client, Collection};
use std::env;
use todo::{create_config_by_type, Todo};
mod utils;
use utils::handle_create;

mod common;
mod logging;

const DB_NAME: &str = "rustApp";
const COLL_NAME: &str = "users";

// Done
#[post("/users")]
pub async fn add_user(db: web::Data<MongoRepo<User>>, body: web::Json<User>) -> HttpResponse {
    let user = User {
        id: None,
        ..body.into_inner()
    };

    let result = db.create(user).await;
    handle_create(result)
}

// Done!!!
#[delete("/users/{id}")]
pub async fn delete_user(db: web::Data<MongoRepo<User>>, path: web::Path<String>) -> HttpResponse {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let result = db.delete(&id).await;
    match result {
        Ok(res) => {
            if res.deleted_count == 1 {
                HttpResponse::Ok().json("successfully deleted!")
            } else {
                HttpResponse::NotFound().json("User with specified ID not found!")
            }
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

// Done!!
#[get("/users")]
pub async fn get_all_users(db: web::Data<MongoRepo<User>>) -> HttpResponse {
    let results = db.list().await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // let uri = "mongodb+srv://yurikrupnik:T4eXKj1RBI4VnszC@cluster0.rdmew.mongodb.net/?retryWrites=true&w=majority";
    // init_logger();
    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let client = Client::with_uri_str(uri).await.expect("failed to connect");

    env::set_var("RUST_LOG", "debug");
    env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let collection: Collection<Product> = client
        .database(db_name)
        .collection(Product::COLLECTION_NAME);

    let repo = MongoRepo::<User>::init(DB_NAME, COLL_NAME).await;
    // let s = repo.list().await;
    // let s = repo.get_all().await;

    // let repo1 = MongoRepo::<Product>::init(DB_NAME, "product").await;
    // let repo2 = MongoRepo::<Todo>::init(DB_NAME, "todo").await;
    let products_data = web::Data::new(collection);
    let db_data = web::Data::new(repo);
    // let db_data1 = web::Data::new(repo1);
    // let db_data2 = web::Data::new(repo2);

    // let s = todos_config().await;
    // repo.get_all();
    HttpServer::new(move || {
        App::new()
            .configure(general_routes)
            .configure(config)
            // .configure(todos_config)
            .configure(create_config_by_type::<Todo>())
            // .configure(set_config_params("nir".to_string()))
            // .wrap(Logger::default())
            .app_data(products_data.clone())
            .app_data(db_data.clone())
            // .app_data(db_data1.clone())
            // .app_data(db_data2.clone())
            .app_data(web::Data::new(client.clone()))
            .service(add_product)
            .service(get_product)
            .service(get_products)
            .service(delete_product)
            .service(update_product)
            // .service(index)
            // .service(read_file)
            .service(add_user)
            .service(get_all_users)
            // .route("/user", web::get().to(repo.doit))
            .service(delete_user)
            // .route(
            //     "/todos",
            //     web::get().to(get_todos), // .method(http::Method::POST)
            //                               // .to(get_todos),
            // )
            .service(
                web::resource("/path").route(
                    web::get()
                        .method(http::Method::CONNECT)
                        //            .guard(guard::Header("content-type", "text/plain"))
                        .to(|req: HttpRequest| HttpResponse::Ok()),
                ),
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
