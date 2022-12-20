// use crate::{bson, doc, handle_create, post, Error};
// use actix_web::{web, HttpResponse, Responder};
// use futures::{StreamExt, TryStream, TryStreamExt};
// // use mongodb::bson::oid::ObjectId;
// use mongodb::results::{DeleteResult, InsertOneResult};
// use mongodb::{Client, Collection};
// use serde::{de::DeserializeOwned, Deserialize, Serialize};
// // use std::arch::asm;
// // use std::fmt::format;
//
// use fake::{Dummy, Fake, Faker};
// // use rand::rngs::StdRng;
// // use rand::SeedableRng;
//
// use async_trait::async_trait;
//
// #[async_trait]
// pub trait Api<T> {
//     async fn get_all(&self) -> HttpResponse;
//     async fn get_one(&self, db: MongoRepo<T>, body: web::Json<T>) -> HttpResponse;
//     // async fn create_item(&self, db: MongoRepo<T>, body: web::Json<T>) -> HttpResponse;
// }
//
// pub struct MongoRepo<T> {
//     col: Collection<T>,
// }
//
// impl<T> MongoRepo<T>
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin,
// {
//     pub async fn init(db_name: &str, col_name: &str) -> Self {
//         let uri =
//             std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());
//         let client = Client::with_uri_str(uri).await.expect("failed to connect");
//         let col = client.database(db_name).collection(col_name);
//         Self { col }
//     }
//     pub async fn create(&self, item: T) -> Result<InsertOneResult, Error> {
//         let item = self
//             .col
//             .insert_one(item, None)
//             .await
//             .expect("Error creating item");
//         Ok(item)
//     }
//     pub async fn delete(&self, id: &String) -> Result<DeleteResult, Error> {
//         let obj_id = bson::oid::ObjectId::parse_str(id).unwrap();
//         let filter = doc! {"_id": obj_id};
//         let user_detail = self
//             .col
//             .delete_one(filter, None)
//             .await
//             .expect("Error deleting item");
//
//         Ok(user_detail)
//     }
//     pub async fn list(&self) -> Result<Vec<T>, Error> {
//         let mut cursor = self
//             .col
//             .find(None, None)
//             .await
//             .expect("Error getting list of users");
//         let mut users: Vec<T> = Vec::new();
//         while let Some(user) = cursor
//             .try_next()
//             .await
//             .expect("Error mapping through cursor")
//         {
//             users.push(user)
//         }
//         Ok(users)
//     }
// }
//
// #[async_trait]
// impl<T> Api<T> for MongoRepo<T>
// where
//     T: Serialize + DeserializeOwned + Sync + Send + Unpin,
// {
//     async fn get_all(&self) -> HttpResponse {
//         let result = MongoRepo::list(self).await;
//         // let result = db.list().await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
//     async fn get_one(&self, db: MongoRepo<T>, body: web::Json<T>) -> HttpResponse {
//         let result = self::MongoRepo::list(self).await;
//         // let result = dblist(self).await;
//         match result {
//             Ok(res) => HttpResponse::Ok().json(res),
//             Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
//         }
//     }
// }
//
// // fn adds<T>(db: web::Data<MongoRepo<T>>, body: web::Json<T>) -> HttpResponse {
// //     let user = User {
// //         id: None,
// //         ..body.into_inner()
// //     };
// //     let result = db.create(user).await;
// //     handle_create(result)
// // }
// //
// // // async fn ds<T>(db: web::Data<MongoRepo<T>>) -> HttpResponse {
// // async fn ds<T: Serialize + DeserializeOwned + Sync + Send + Unpin>(
// //     db: MongoRepo<T>,
// // ) -> HttpResponse {
// //     // "SFdf".to_string()
// //     let user = User {
// //         id: None,
// //         // ..body.into_inner()
// //         first_name: "".to_string(),
// //         last_name: "".to_string(),
// //         username: "".to_string(),
// //         email: "".to_string(),
// //     };
// //     let result = db.create(user).await;
// //     handle_create(result)
// // }
// //
// // fn das<T: Serialize + DeserializeOwned + Sync + Send + Unpin>(
// // ) -> fn(ds: web::Data<MongoRepo<T>>) -> HttpResponse {
// //     return ds;
// // }
// //
// // fn dsdsd() {
// //     let sd = das::<User>();
// //     // sd().
// // }
