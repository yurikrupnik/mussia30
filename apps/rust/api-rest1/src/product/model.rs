use mongo::serialize_object_id;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Product {
    #[serde(
        rename = "_id",
        serialize_with = "serialize_object_id",
        skip_serializing_if = "Option::is_none"
    )]
    pub id: Option<ObjectId>,
    pub name: String,
}

impl Product {
    pub const COLLECTION: &'static str = "products";
}
