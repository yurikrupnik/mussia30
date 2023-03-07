//! Example of login and logout using redis-based sessions
//!
//! Every request gets a session, corresponding to a cache entry and cookie.
//! At login, the session key changes and session state in cache re-assigns.
//! At logout, session state in cache is removed and cookie is invalidated.
//!
#![allow(unused)] // silence unused warnings while exploring (to comment out)
use actix_session::{storage::RedisActorSessionStore, Session, SessionMiddleware};
use actix_web::{
    middleware, web,
    web::{get, post, resource},
    App, HttpResponse, HttpServer, Result,
};
use serde::{Deserialize, Serialize};

use std::{error::Error, time::Duration};
use tokio::time::sleep;

use redis::{
    from_redis_value,
    streams::{StreamRangeReply, StreamReadOptions, StreamReadReply},
    AsyncCommands, Client,
};

#[derive(Serialize, Deserialize, Debug, PartialEq, Eq)]
pub struct IndexResponse {
    user_id: Option<String>,
    counter: i32,
}

async fn index(session: Session) -> Result<HttpResponse> {
    let user_id: Option<String> = session.get::<String>("user_id").unwrap();
    let counter: i32 = session
        .get::<i32>("counter")
        .unwrap_or(Some(0))
        .unwrap_or(0);

    Ok(HttpResponse::Ok().json(IndexResponse { user_id, counter }))
}

async fn do_something(session: Session) -> Result<HttpResponse> {
    let user_id: Option<String> = session.get::<String>("user_id").unwrap();
    let counter: i32 = session
        .get::<i32>("counter")
        .unwrap_or(Some(0))
        .map_or(1, |inner| inner + 1);
    session.insert("counter", counter)?;

    Ok(HttpResponse::Ok().json(IndexResponse { user_id, counter }))
}

#[derive(Deserialize)]
struct Identity {
    user_id: String,
}

async fn login(user_id: web::Json<Identity>, session: Session) -> Result<HttpResponse> {
    let id = user_id.into_inner().user_id;
    session.insert("user_id", &id)?;
    session.renew();

    let counter: i32 = session
        .get::<i32>("counter")
        .unwrap_or(Some(0))
        .unwrap_or(0);

    Ok(HttpResponse::Ok().json(IndexResponse {
        user_id: Some(id),
        counter,
    }))
}

async fn logout(session: Session) -> Result<String> {
    let id: Option<String> = session.get("user_id")?;
    if let Some(x) = id {
        session.purge();
        Ok(format!("Logged out: {x}"))
    } else {
        Ok("Could not log out anonymous user".into())
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn Error>> {
    // 1) Create Connection
    // let client = Client::open("redis://127.0.0.1/")?;
    let client = Client::open(
        "redis://default:2tjvUh55819HJdlwDBIy@containers-us-west-98.railway.app:7917",
    )?;
    let mut con = client.get_tokio_connection().await?;

    // 2) Set / Get Key
    con.set("my_key", "Hello world!").await?;
    let result: String = con.get("my_key").await?;
    println!("->> my_key: {result}\n");

    // 3) xadd to redis stream
    con.xadd(
        "my_stream",
        "*",
        &[("name", "name-01"), ("title", "title 01")],
    )
    .await?;
    let len: i32 = con.xlen("my_stream").await?;
    println!("->> my_stream len {len}\n");

    // 4) xrevrange the read stream
    let result: Option<StreamRangeReply> = con.xrevrange_count("my_stream", "+", "-", 10).await?;
    if let Some(reply) = result {
        for stream_id in reply.ids {
            println!("->> xrevrange stream entity: {}  ", stream_id.id);
            for (name, value) in stream_id.map.iter() {
                println!("  ->> {}: {}", name, from_redis_value::<String>(value)?);
            }
            println!();
        }
    }

    // 5) Blocking xread
    tokio::spawn(async {
        let client = Client::open(
            "redis://default:2tjvUh55819HJdlwDBIy@containers-us-west-98.railway.app:7917",
        )
        .unwrap();
        let mut con = client.get_tokio_connection().await.unwrap();
        loop {
            let opts = StreamReadOptions::default().count(1).block(0);
            let result: Option<StreamReadReply> = con
                .xread_options(&["my_stream"], &["$"], &opts)
                .await
                .unwrap();
            if let Some(reply) = result {
                for stream_key in reply.keys {
                    println!("->> xread block: {}", stream_key.key);
                    for stream_id in stream_key.ids {
                        println!("  ->> StreamId: {stream_id:?}");
                    }
                }
                println!();
            }
        }
    });

    // 6) Add some stream entries
    sleep(Duration::from_millis(100)).await;
    con.xadd(
        "my_stream",
        "*",
        &[("name", "name-02"), ("title", "title 02")],
    )
    .await?;
    sleep(Duration::from_millis(100)).await;
    con.xadd(
        "my_stream",
        "*",
        &[("name", "name-03"), ("title", "title 03")],
    )
    .await?;

    // 7) Final wait & cleanup
    sleep(Duration::from_millis(1000)).await;
    con.del("my_key").await?;
    con.del("my_stream").await?;

    println!("->> the end");

    Ok(())
}
// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
//
//     log::info!("starting HTTP server at http://localhost:8080");
//
//     // Generate a random 32 byte key. Note that it is important to use a unique
//     // private key for every project. Anyone with access to the key can generate
//     // authentication cookies for any user!
//     let private_key = actix_web::cookie::Key::generate();
//     // let private_key = actix_web::cookie::Key::generate();
//
//     HttpServer::new(move || {
//         App::new()
//             // redis session middleware
//             .wrap(
//                 SessionMiddleware::builder(
//                     // RedisActorSessionStore::new("127.0.0.1:6379"),
//                     RedisActorSessionStore::new("containers-us-west-98.railway.app:7917"),
//                     private_key.clone(),
//                 )
//                 .build.yaml(),
//             )
//             // enable logger - always register Actix Web Logger middleware last
//             .wrap(middleware::Logger::default())
//             .service(resource("/").route(get().to(index)))
//             .service(resource("/do_something").route(post().to(do_something)))
//             .service(resource("/login").route(post().to(login)))
//             .service(resource("/logout").route(post().to(logout)))
//     })
//     .bind(("127.0.0.1", 8080))?
//     .run()
//     .await
// }

// #[cfg(test)]
// mod test {
//     use actix_web::{
//         middleware,
//         web::{get, post, resource},
//         App,
//     };
//     use serde_json::json;
//
//     use super::*;
//
//     #[actix_web::test]
//     async fn test_workflow() {
//         let private_key = actix_web::cookie::Key::generate();
//         let srv = actix_test::start(move || {
//             App::new()
//                 .wrap(
//                     SessionMiddleware::builder(
//                         RedisActorSessionStore::new("127.0.0.1:6379"),
//                         // RedisActorSessionStore::new("containers-us-west-98.railway.app:7917"),
//                         private_key.clone(),
//                     )
//                     .cookie_name("test-session".to_string())
//                     .build.yaml(),
//                 )
//                 .wrap(middleware::Logger::default())
//                 .service(resource("/").route(get().to(index)))
//                 .service(resource("/do_something").route(post().to(do_something)))
//                 .service(resource("/login").route(post().to(login)))
//                 .service(resource("/logout").route(post().to(logout)))
//         });
//
//         // Step 1:  GET index
//         //   - set-cookie actix-session should NOT be in response (session data is empty)
//         //   - response should be: {"counter": 0, "user_id": None}
//         let request = srv.get("/").send();
//         let mut resp_1 = request.await.unwrap();
//         assert!(resp_1.cookies().unwrap().is_empty());
//         let result_1 = resp_1.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_1,
//             IndexResponse {
//                 user_id: None,
//                 counter: 0
//             }
//         );
//
//         // Step 2: POST to do_something, including session cookie #1 in request
//         //   - adds new session state in redis:  {"counter": 1}
//         //   - response should be: {"counter": 1, "user_id": None}
//         let req_3 = srv.post("/do_something").send();
//         let mut resp_3 = req_3.await.unwrap();
//         let cookie_1 = resp_3
//             .cookies()
//             .unwrap()
//             .clone()
//             .into_iter()
//             .find(|c| c.name() == "test-session")
//             .unwrap();
//         let result_3 = resp_3.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_3,
//             IndexResponse {
//                 user_id: None,
//                 counter: 1
//             }
//         );
//
//         // Step 3: POST again to do_something, including session cookie #1 in request
//         //   - updates session state in redis:  {"counter": 2}
//         //   - response should be: {"counter": 2, "user_id": None}
//         let req_4 = srv.post("/do_something").cookie(cookie_1.clone()).send();
//         let mut resp_4 = req_4.await.unwrap();
//         let result_4 = resp_4.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_4,
//             IndexResponse {
//                 user_id: None,
//                 counter: 2
//             }
//         );
//
//         // Step 4: POST to login, including session cookie #1 in request
//         //   - set-cookie actix-session will be in response  (session cookie #2)
//         //   - updates session state in redis: {"counter": 2, "user_id": "ferris"}
//         let req_5 = srv
//             .post("/login")
//             .cookie(cookie_1.clone())
//             .send_json(&json!({"user_id": "ferris"}));
//         let mut resp_5 = req_5.await.unwrap();
//         let cookie_2 = resp_5
//             .cookies()
//             .unwrap()
//             .clone()
//             .into_iter()
//             .find(|c| c.name() == "test-session")
//             .unwrap();
//         assert_ne!(cookie_1.value(), cookie_2.value());
//
//         let result_5 = resp_5.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_5,
//             IndexResponse {
//                 user_id: Some("ferris".into()),
//                 counter: 2
//             }
//         );
//
//         // Step 5: GET index, including session cookie #2 in request
//         //   - response should be: {"counter": 2, "user_id": "ferris"}
//         let req_6 = srv.get("/").cookie(cookie_2.clone()).send();
//         let mut resp_6 = req_6.await.unwrap();
//         let result_6 = resp_6.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_6,
//             IndexResponse {
//                 user_id: Some("ferris".into()),
//                 counter: 2
//             }
//         );
//
//         // Step 6: POST again to do_something, including session cookie #2 in request
//         //   - updates session state in redis: {"counter": 3, "user_id": "ferris"}
//         //   - response should be: {"counter": 2, "user_id": None}
//         let req_7 = srv.post("/do_something").cookie(cookie_2.clone()).send();
//         let mut resp_7 = req_7.await.unwrap();
//         let result_7 = resp_7.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_7,
//             IndexResponse {
//                 user_id: Some("ferris".into()),
//                 counter: 3
//             }
//         );
//
//         // Step 7: GET index, including session cookie #1 in request
//         //   - set-cookie actix-session will be in response (session cookie #3)
//         //   - response should be: {"counter": 0, "user_id": None}
//         let req_8 = srv.get("/").cookie(cookie_1.clone()).send();
//         let mut resp_8 = req_8.await.unwrap();
//         assert!(resp_8.cookies().unwrap().is_empty());
//         let result_8 = resp_8.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_8,
//             IndexResponse {
//                 user_id: None,
//                 counter: 0
//             }
//         );
//
//         // Step 8: POST to logout, including session cookie #2
//         //   - set-cookie actix-session will be in response with session cookie #2
//         //     invalidation logic
//         let req_9 = srv.post("/logout").cookie(cookie_2.clone()).send();
//         let resp_9 = req_9.await.unwrap();
//         let cookie_4 = resp_9
//             .cookies()
//             .unwrap()
//             .clone()
//             .into_iter()
//             .find(|c| c.name() == "test-session")
//             .unwrap();
//
//         let now = time::OffsetDateTime::now_utc();
//         assert_ne!(
//             now.year(),
//             cookie_4.expires().unwrap().datetime().unwrap().year()
//         );
//
//         // Step 9: GET index, including session cookie #2 in request
//         //   - set-cookie actix-session will be in response (session cookie #3)
//         //   - response should be: {"counter": 0, "user_id": None}
//         let req_10 = srv.get("/").cookie(cookie_2.clone()).send();
//         let mut resp_10 = req_10.await.unwrap();
//         let result_10 = resp_10.json::<IndexResponse>().await.unwrap();
//         assert_eq!(
//             result_10,
//             IndexResponse {
//                 user_id: None,
//                 counter: 0
//             }
//         );
//     }
// }
