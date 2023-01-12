mod product;
mod swagger;
mod todo;
mod user;

use actix_cors::Cors;
use actix_web::{middleware::Logger, web, App, HttpServer};
use env_logger::Env;
use mongodb::Client;
use std::env;
use swagger::ApiDoc;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;
// use utoipa::path;s

// #[warn(dead_code)]
// struct Pet {
//     id: u64,
//     name: String,
// }
// #[warn(dead_code)]
// async fn get_pet_by_id(pet_id: u64) -> Pet {
//     Pet {
//         id: pet_id,
//         name: "lightning".to_string(),
//     }
// }
//
// fn create_swagger_func_way() {
//     // utoipa::openapi::OpenApiBuilder::new()
//     let s = utoipa::openapi::PathsBuilder::new().path(
//         "/pets/{id}",
//         utoipa::openapi::PathItem::new(
//             utoipa::openapi::PathItemType::Get,
//             utoipa::openapi::path::OperationBuilder::new()
//                 .responses(
//                     utoipa::openapi::ResponsesBuilder::new()
//                         .response(
//                             "200",
//                             utoipa::openapi::ResponseBuilder::new()
//                                 .description("Pet found successfully")
//                                 .content(
//                                     "application/json",
//                                     utoipa::openapi::Content::new(
//                                         utoipa::openapi::Ref::from_schema_name("Pet"),
//                                     ),
//                                 ),
//                         )
//                         .response("404", utoipa::openapi::Response::new("Pet was not found")),
//                 )
//                 .operation_id(Some("get_pet_by_id"))
//                 .deprecated(Some(utoipa::openapi::Deprecated::False))
//                 .summary(Some("Get pet by id"))
//                 .description(Some(
//                     "Get pet by id\n\nGet pet from database by pet database id\n",
//                 ))
//                 .parameter(
//                     utoipa::openapi::path::ParameterBuilder::new()
//                         .name("id")
//                         .parameter_in(utoipa::openapi::path::ParameterIn::Path)
//                         .required(utoipa::openapi::Required::True)
//                         .deprecated(Some(utoipa::openapi::Deprecated::False))
//                         .description(Some("Pet database id to get Pet for"))
//                         .schema(Some(
//                             utoipa::openapi::ObjectBuilder::new()
//                                 .schema_type(utoipa::openapi::SchemaType::Integer)
//                                 .format(Some(utoipa::openapi::SchemaFormat::KnownFormat(
//                                     utoipa::openapi::KnownFormat::Int64,
//                                 ))),
//                         )),
//                 )
//                 .tag("pet_api"),
//         ),
//     );
//     s.build();
// }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // env::set_var("RUST_LOG", "debug");
    // env::set_var("RUST_BACKTRACE", "1");
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    let openapi = ApiDoc::openapi();
    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
    let client = Client::with_uri_str(uri).await.expect("failed to connect");
    let store = web::Data::new(todo::TodoStore::default());
    // data here
    let client_data = web::Data::new(client); // used for product api

    HttpServer::new(move || {
        let cors = Cors::default()
            // .allowed_origin("http://localhost:5173")
            .allowed_origin_fn(|origin, _req_head| {
                print!("origin {}, url {}", origin.is_empty(), _req_head.uri);
                true
            })
            .allowed_methods(vec!["GET", "POST", "DELETE", "PUT"])
            .max_age(3600);
        App::new()
            .service(
                web::scope("/api")
                    .app_data(client_data.clone())
                    .service(product::add_product)
                    .service(product::get_product)
                    .service(product::get_products)
                    .service(product::delete_product)
                    .service(product::delete_products)
                    .service(product::update_product)
                    .configure(user::create_config_by_type::<user::User>(
                        "rustApp",
                        user::User::get_collection(2),
                    )),
            )
            .wrap(cors)
            .wrap(Logger::default())
            .configure(todo::configure(store.clone()))
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-doc/openapi.json", openapi.clone()),
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
