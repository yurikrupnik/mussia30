use actix_web::{
    delete, get, guard, http, middleware::Logger, post, web, App, HttpRequest, HttpResponse,
    HttpServer, Responder, Result, Route,
};
use serde::Serialize;

pub fn general_routes(cfg: &mut web::ServiceConfig) {
    cfg.route("/random", web::get().to(random_check_handler));
    cfg.route("/file", web::get().to(read_file));
    cfg.route("/a/{name}", web::get().to(index));
}

async fn hello() -> HttpResponse {
    // HttpResponse::Ok().body("Hello")
    HttpResponse::Ok().json("Hello")
}

pub fn config(cfg: &mut web::ServiceConfig) {
    // let route = Route::new();
    cfg.service(
        web::resource("/test")
            .route(web::get().to(hello))
            .route(web::post().to(|| HttpResponse::Ok()))
            .route(web::head().to(|| HttpResponse::MethodNotAllowed())),
    );
}

fn config_creator(url: String) {
    // cfg.service(
    //     web::resource(format!("/{}", url))
    //         .route(web::get().to(|| HttpResponse::Ok()))
    //         .route(web::post().to(|| HttpResponse::Ok()))
    //         .route(web::head().to(|| HttpResponse::MethodNotAllowed())),
    // );
    // cfg
}

pub fn set_config_params(url: String) {
    // pub fn set_config_params(url: String) -> fn(&mut web::ServiceConfig) {
    // let s = config_creator(url);
    // s
}

async fn random_check_handler() -> Result<impl Responder> {
    Ok(web::Json("random"))
}

#[derive(Serialize)]
struct MyObj {
    name: String,
}

async fn read_file() -> Result<impl Responder> {
    Ok(web::Json("reading file!"))
}

async fn index(name: web::Path<String>) -> Result<impl Responder> {
    let obj = MyObj {
        name: name.to_string(),
    };
    Ok(web::Json(obj))
}
