use crate::user;
use crate::user::handlers::{add_user, delete_user, drop_users, get_user, update_user, user_list};
use actix_web::{web, HttpResponse};
use futures::executor::block_on;
use mongo::MongoRepo;
use serde::{de::DeserializeOwned, Serialize};
// use std::{future::Future, pin::Pin};

async fn inits<T>(cfg: &mut web::ServiceConfig, collection: &str)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepo::<T>::init("rustApp", collection).await;
    let data: web::Data<MongoRepo<T>> = web::Data::new(repository);
    cfg.app_data(data);
}

pub fn create_config_by_type<T>(collection: &str) -> impl FnOnce(&mut web::ServiceConfig) + '_
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    move |cfg: &mut web::ServiceConfig| {
        block_on(inits::<T>(cfg, collection));
        let url = format!("/{}", collection);
        cfg.service(
            web::scope(url.as_str())
                .service(
                    web::resource("")
                        .route(web::get().to(user_list))
                        .route(web::delete().to(drop_users))
                        .route(web::post().to(add_user)),
                )
                .service(
                    web::resource("/{id}")
                        .route(web::delete().to(delete_user))
                        .route(web::put().to(update_user))
                        .route(web::get().to(get_user)),
                ),
        )
        .service(
            web::scope("/aris").service(web::resource("").route(web::post().to(Shit::get_shit))),
        );
    }
}

// todo try making struct methods to work as handlers with generic types
// Pin<Box<HttpResponse>>
// Pin<Box<dyn Future<Output = HttpResponse>>>
// fn get_all_items_closure() -> fn(path: web::Path<String>) -> HttpResponse {
//     let func = |path: web::Path<String>| {
//         let id = path.into_inner();
//         if id.is_empty() || id.len() != 24 {
//             return HttpResponse::BadRequest().body("invalid ID");
//         };
//         HttpResponse::Ok().body(format!("id is {}", id))
//     };
//     func
// }
// use async_trait::async_trait;

struct Shit;

// #[async_trait]
// trait So<T> {
//     async fn get_shit(body: web::Json<user::User>) -> HttpResponse;
// }

impl Shit {
    async fn get_shit(body: web::Json<user::User>) -> HttpResponse {
        HttpResponse::Ok().json(body)
    }
}
