use crate::user::handlers::{add_user, delete_user, drop_users, get_user, update_user, user_list};
use actix_web::{web, HttpResponse};
use futures::executor::block_on;
use mongo::MongoRepo;
use plurals::{Lang, Plural};
use serde::{de::DeserializeOwned, Serialize};

async fn inits<T>(cfg: &mut web::ServiceConfig)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    let repository = MongoRepo::<T>::init("rustApp", "users").await;
    let data: web::Data<MongoRepo<T>> = web::Data::new(repository);
    cfg.app_data(data);
}

pub fn create_config_by_type<T>() -> impl FnOnce(&mut web::ServiceConfig)
where
    T: Serialize + DeserializeOwned + Sync + Send + Unpin + 'static,
{
    move |cfg: &mut web::ServiceConfig| {
        block_on(inits::<T>(cfg));
        // cfg.service(web::scope("/users").service());
        cfg.service(
            web::resource("/users")
                .route(web::post().to(add_user))
                .route(web::get().to(user_list))
                .route(web::delete().to(drop_users))
                .route(web::head().to(HttpResponse::MethodNotAllowed)),
        );
        cfg.service(
            web::resource("/users/{id}")
                .route(web::delete().to(delete_user))
                .route(web::put().to(update_user))
                .route(web::get().to(get_user)),
        );
    }
}
