use actix_protobuf::{ProtoBuf, ProtoBufResponseBuilder as _};
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Result};
use grpc;
use prost_derive::Message;

// impl

#[derive(Clone, PartialEq, Eq, Message)]
pub struct MyObj {
    #[prost(int32, tag = "1")]
    pub number: i32,

    #[prost(string, tag = "2")]
    pub name: String,
}

// does not work, returns 400, works with regular actix
async fn index(msg: ProtoBuf<MyObj>) -> Result<HttpResponse> {
    log::info!("model: {msg:?}");
    println!("model {:?}", msg);
    // HttpResponse::Ok().await
    HttpResponse::Ok().protobuf(msg.0) // <- send response
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // grpc::service
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            .service(web::resource("/").route(web::post().to(index)))
            .wrap(middleware::Logger::default())
    })
    .workers(1)
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
