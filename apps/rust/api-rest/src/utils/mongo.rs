use actix_web::{HttpResponse, Result};
use mongodb::{bson, bson::doc, options::IndexOptions, Client, Collection, IndexModel};
use mongodb::{
    bson::extjson::de::Error,
    results::{DeleteResult, InsertOneResult},
};

pub fn handle_create(result: Result<InsertOneResult, Error>) -> HttpResponse {
    match result {
        Ok(res) => HttpResponse::Ok().json(res.inserted_id),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

pub fn handle_delete(result: Result<DeleteResult, Error>) -> HttpResponse {
    match result {
        Ok(res) => HttpResponse::Ok().json(res.deleted_count),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
