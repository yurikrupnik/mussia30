// use mongodb::bson::oid::ObjectId;
// use serde::{Deserialize, Serialize};
//
// // fn serialize_object_id<S>(oid: &Option<ObjectId>, s: S) -> Result<S::Ok, S::Error>
// // where
// //     S: Serializer,
// // {
// //     match oid.as_ref().map(|x| x.to_hex()) {
// //         Some(v) => s.serialize_str(&v),
// //         None => s.serialize_none(),
// //     }
// // }
//
// #[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
// pub struct Product {
//     #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
//     pub id: Option<ObjectId>,
//     pub name: String,
// }
//
// impl Product {
//     pub const COLLECTION_NAME: &'static str = "products";
// }
