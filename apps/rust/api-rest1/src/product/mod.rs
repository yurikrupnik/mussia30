mod handlers;
mod model;

pub use handlers::{
    add_product, delete_product, delete_products, get_product, get_products, update_product,
};
pub use model::Product;
