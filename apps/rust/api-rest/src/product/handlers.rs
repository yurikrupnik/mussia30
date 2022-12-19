// use crate::product::model::Product;
// use actix_web::{delete, get, post, put, web, HttpResponse};
// use futures::TryStreamExt;
// use mongodb::{
//     bson::{doc, oid::ObjectId},
//     Client, Collection,
// };
//
// pub const DB_NAME: &str = "rustApp";
// pub const COLL_NAME: &str = "products";
//
// #[post("/products")]
// pub async fn add_product(client: web::Data<Client>, body: web::Json<Product>) -> HttpResponse {
//     let collection: Collection<Product> = client
//         .database(DB_NAME)
//         .collection(Product::COLLECTION_NAME);
//     let result = collection
//         .insert_one(body.clone(), None)
//         .await
//         .expect("Error creating item");
//     HttpResponse::Ok().json(result.inserted_id)
// }
//
// #[get("/products/{id}")]
// pub async fn get_product(client: web::Data<Client>, path: web::Path<String>) -> HttpResponse {
//     let id = path.into_inner();
//     if id.is_empty() || id.len() != 24 {
//         return HttpResponse::BadRequest().body("invalid ID");
//     };
//     let collection: Collection<Product> = client
//         .database(DB_NAME)
//         .collection(Product::COLLECTION_NAME);
//     let obj_id = ObjectId::parse_str(id).unwrap();
//     let filter = doc! {"_id": obj_id};
//     let result = collection.find_one(filter, None).await;
//     match result {
//         Ok(Some(payload)) => HttpResponse::Ok().json(payload),
//         Ok(None) => HttpResponse::NotFound().body(format!("No user found with id {}", obj_id)),
//         Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//     }
// }
//
// #[get("/products")]
// pub async fn get_products(client: web::Data<Client>) -> HttpResponse {
//     let collection: Collection<Product> = client
//         .database(DB_NAME)
//         .collection(Product::COLLECTION_NAME);
//     // let filter = doc! {"name": "product 1".to_string()};
//     let mut cursor = collection.find(None, None).await.expect("failed fetching");
//     let mut payload: Vec<Product> = Vec::new();
//     while let Some(product) = cursor
//         .try_next()
//         .await
//         .expect("Error mapping through cursor")
//     {
//         payload.push(product)
//     }
//     HttpResponse::Ok().json(payload)
// }
//
// #[delete("/products/{id}")]
// pub async fn delete_product(client: web::Data<Client>, path: web::Path<String>) -> HttpResponse {
//     let id = path.into_inner();
//     if id.is_empty() || id.len() != 24 {
//         return HttpResponse::BadRequest().body("invalid ID");
//     };
//     let obj_id = ObjectId::parse_str(id).unwrap();
//     let filter = doc! {"_id": obj_id};
//     let collection: Collection<Product> = client
//         .database(DB_NAME)
//         .collection(Product::COLLECTION_NAME);
//     let result = collection
//         .delete_one(filter, None)
//         .await
//         .expect("failed deleting");
//     if result.deleted_count == 1 {
//         HttpResponse::Ok().json("successfully deleted!")
//     } else {
//         HttpResponse::NotFound().json("product with specified ID not found!")
//     }
// }
//
// //  client: web::Data<Client>,
// //     body: web::Json<Product>,
// //     path: web::Path<String>,
// #[put("/products/{id}")]
// pub async fn update_product() -> HttpResponse {
//     // let id = path.into_inner();
//     // if id.is_empty() || id.len() != 24 {
//     //     return HttpResponse::BadRequest().body("invalid ID");
//     // };
//     // let obj_id = ObjectId::parse_str(id).unwrap();
//     // let filter = doc! {"_id": obj_id};
//     // let collection: Collection<Product> = client
//     //     .database(DB_NAME)
//     //     .collection(Product::COLLECTION_NAME);
//     // // let result = collection.update_one();
//     // let new_doc = doc! {
//     //     "$set":
//     //         {
//     //             "name": body.name.clone()
//     //         },
//     // };
//     // let result = collection
//     //     .find_one_and_update(filter, new_doc, None)
//     //     .await
//     //     .ok();
//     // match result {
//     //     Some(res) => HttpResponse::Ok().json(res),
//     //     None => HttpResponse::Ok().json("ads"),
//     // }
//
//     HttpResponse::Ok().json("asd")
// }
