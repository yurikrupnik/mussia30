use crate::product::model::Product;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use futures::TryStreamExt;
use log::*;
use mongodb::{
    bson::{doc, oid::ObjectId},
    Client, Collection,
};

pub const DB_NAME: &str = "rustApp";

#[post("/products")]
pub async fn add_product(client: web::Data<Client>, body: web::Json<Product>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let result = collection
        .insert_one(body.clone(), None)
        .await
        .expect("Error creating item");
    let new_id = result.inserted_id.as_object_id().unwrap();
    info!("save resource, new_id={}", new_id);
    let res = collection.find_one(doc! {"_id": new_id}, None).await;
    match res {
        Ok(Some(payload)) => HttpResponse::Ok().json(payload),
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {}", new_id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/products/{id}")]
pub async fn get_product(client: web::Data<Client>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let result = collection.find_one(filter, None).await;
    match result {
        Ok(Some(payload)) => HttpResponse::Ok().json(payload),
        Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {}", obj_id)),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[get("/products")]
pub async fn get_products(client: web::Data<Client>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    // let filter = doc! {"name": "product 1".to_string()};
    let mut cursor = collection.find(None, None).await.expect("failed fetching");
    let mut payload: Vec<Product> = Vec::new();
    while let Some(product) = cursor
        .try_next()
        .await
        .expect("Error mapping through cursor")
    {
        payload.push(product)
    }
    HttpResponse::Ok().json(payload)
}

#[delete("/products/{id}")]
pub async fn delete_product(client: web::Data<Client>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    let result = collection
        .delete_one(filter, None)
        .await
        .expect("failed deleting");
    if result.deleted_count == 1 {
        HttpResponse::Ok().json("successfully deleted!")
    } else {
        HttpResponse::NotFound().json("product with specified ID not found!")
    }
}

#[delete("/products")]
pub async fn delete_products(client: web::Data<Client>) -> impl Responder {
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    collection.drop(None).await.expect("failed deleting");
    HttpResponse::Ok().json("successfully deleted!")
}

// todo update the update function to use full struct!
#[put("/products/{id}")]
pub async fn update_product(
    client: web::Data<Client>,
    path: web::Path<String>,
    body: web::Json<Product>,
) -> impl Responder {
    let id = path.into_inner();
    if id.is_empty() || id.len() != 24 {
        return HttpResponse::BadRequest().body("invalid ID");
    };
    let obj_id = ObjectId::parse_str(id).unwrap();
    let filter = doc! {"_id": obj_id};
    let collection: Collection<Product> = client.database(DB_NAME).collection(Product::COLLECTION);
    // let result = collection.update_one();
    let new_doc = doc! {
        "$set":
            {
                "name": body.name.clone()
            },
    };
    let result = collection
        .find_one_and_update(filter, new_doc, None)
        .await
        .ok();
    match result {
        Some(res) => HttpResponse::Ok().json(res),
        None => HttpResponse::Ok().json("ads"),
    }
}
