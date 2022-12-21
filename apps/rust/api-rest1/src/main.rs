// mods
mod product;
mod swagger;
mod todo;
mod user;
// libs for app
// core
use actix_web::{
    dev::{Service, ServiceRequest, ServiceResponse, Transform},
    middleware::Logger,
    web, App, HttpResponse, HttpServer,
};
use env_logger::Env;
use futures::future::LocalBoxFuture;
use mongo::ErrorResponse;
use mongodb::Client;
use std::{
    env,
    future::{self, Ready},
};
use swagger::ApiDoc;
use utoipa::{
    openapi::security::{ApiKey, ApiKeyValue, SecurityScheme},
    Modify, OpenApi,
};
use utoipa_swagger_ui::SwaggerUi;

// const API_KEY_NAME: &str = "todo_apikey";
// const API_KEY: &str = "utoipa-rocks";

// #[derive(OpenApi)]
// #[openapi(
// paths(
// product::add_product,
// product::get_products,
// todo::get_todos,
// todo::create_todo,
// todo::delete_todo,
// todo::get_todo_by_id,
// todo::update_todo,
// todo::search_todos,
// user::user_list,
// user::add_user,
// user::delete_user,
// user::drop_users,
// user::get_user,
// user::update_user,
// ),
// components(
// schemas(product::Product, ErrorResponse),
// schemas(todo::Todo, todo::TodoUpdateRequest, ErrorResponse),
// schemas(user::User),
// ),
// tags(
// (name = "todo", description = "Todo management endpoints."),
// (name = "product", description = "Products management endpoints."),
// (name = "user", description = "Users management endpoints."),
// ),
// modifiers(&SecurityAddon)
// )]
// struct ApiDoc;
//
// struct SecurityAddon;

// impl Modify for SecurityAddon {
//     fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
//         let components = openapi.components.as_mut().unwrap(); // we can unwrap safely since there already is components registered.
//         components.add_security_scheme(
//             "api_key",
//             SecurityScheme::ApiKey(ApiKey::Header(ApiKeyValue::new("todo_apikey"))),
//         )
//     }
// }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "debug");
    env::set_var("RUST_BACKTRACE", "1");

    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let openapi = ApiDoc::openapi();

    // todo struct to document
    // todo move swagger to other file
    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    let store = web::Data::new(todo::TodoStore::default());
    // data here
    let client_data = web::Data::new(client); // used for product api
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .configure(todo::configure(store.clone()))
            .configure(user::create_config_by_type::<user::User>(
                user::User::get_collection(2),
            ))
            .app_data(client_data.clone())
            .service(product::add_product)
            .service(product::get_product)
            .service(product::get_products)
            .service(product::delete_product)
            .service(product::delete_products)
            .service(product::update_product)
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-doc/openapi.json", openapi.clone()),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
