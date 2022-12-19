use actix_web::{
    delete, get, guard, http, middleware::Logger, post, web, App, HttpRequest, HttpResponse,
    HttpServer, Responder, Result, Route,
};
// use futures::TryFutureExt;

use futures::executor::block_on;

mod model;

use crate::model::{Api, MongoRepo};
pub use model::Todo;

use serde::{de::DeserializeOwned, Deserialize, Serialize};

use std::{future::Future, pin::Pin};

async fn todos_list(db: web::Data<MongoRepo<Todo>>) -> HttpResponse {
    let results = db.list().await;
    match results {
        Ok(res) => HttpResponse::Ok().json(res),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

async fn inits<T>(cfg: &mut web::ServiceConfig)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repo1 = MongoRepo::<T>::init("rustApp", "product").await;
    let db_data1 = web::Data::new(repo1);
    cfg.app_data(db_data1);
}

// Pin<Box<HttpResponse>>
// Pin<Box<dyn Future<Output = HttpResponse>>>
// fn get_all_items_closure() -> fn(web::Data<MongoRepo<Todo>>) -> Pin<Box<HttpResponse>> {
//     let func = |db: web::Data<MongoRepo<Todo>>| {
//         let results = block_on(db.list());
//         Box::pin({
//             match results {
//                 Ok(res) => HttpResponse::Ok().json(res),
//                 Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//             }
//         })
//     };
//     func
// }

pub fn create_config_by_type<T>() -> impl FnOnce(&mut web::ServiceConfig)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    |cfg: &mut web::ServiceConfig| {
        block_on(inits::<T>(cfg));
        cfg.service(
            web::resource("/todo")
                .route(web::post().to(HttpResponse::Ok))
                .route(web::get().to(todos_list))
                // .route(web::get().to(get_all_items_closure()))
                .route(web::head().to(HttpResponse::MethodNotAllowed)),
        );
    }
}

// pub fn todos_config(cfg: &mut web::ServiceConfig) {
//     block_on(inits::<Todo>(cfg));
//     cfg.service(
//         web::resource("/todo")
//             .route(web::post().to(HttpResponse::Ok))
//             .route(web::get().to(get_all_items))
//             .route(web::head().to(HttpResponse::MethodNotAllowed)),
//     );
// }

// struct MyStruct {
//     text: &'static str,
//     number: u32,
// }
// impl MyStruct {
//     fn new(text: &'static str, number: u32) -> MyStruct {
//         MyStruct {
//             text: text,
//             number: number,
//         }
//     }
//     // We have to specify that 'self' is an argument.
//     fn get_number(&self) -> u32 {
//         self.number
//     }
//     // We can specify different kinds of ownership and mutability of self.
//     fn inc_number(&mut self) {
//         self.number += 1;
//     }
//     // There are three different types of 'self'
//     fn destructor(self) {
//         println!("Destructing {}", self.text);
//     }
// }
// fn da() {
//     let obj = MyStruct::new("asd", 2);
//     obj.get_number();
//     MyStruct::get_number(&obj);
//     // obj.destructor();
//     MyStruct::destructor(obj);
// }
