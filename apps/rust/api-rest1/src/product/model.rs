use mongo::serialize_object_id;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

/// Request to update existing `Product` item.
#[derive(Clone, ToSchema, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Product {
    #[serde(
        rename = "_id",
        serialize_with = "serialize_object_id",
        skip_serializing_if = "Option::is_none"
    )]
    pub id: Option<ObjectId>,
    #[schema(default = "product 1")]
    pub name: String,
}

impl Product {
    pub const COLLECTION: &'static str = "products";
}

/// Todo endpoint error responses
#[derive(Serialize, Deserialize, Clone, ToSchema)]
pub enum ErrorResponse {
    /// When Todo is not found by search term.
    NotFound(String),
    /// When there is a conflict storing a new todo.
    Conflict(String),
    /// When todo enpoint was called without correct credentials
    Unauthorized(String),
}
