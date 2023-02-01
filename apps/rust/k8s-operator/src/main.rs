//! Generated types support documentation
#![deny(missing_docs)]
use anyhow::Ok;
use schemars::JsonSchema;
use futures::{pin_mut, TryStreamExt};

//extern crate pretty_env_logger;
//#[macro_use] extern crate log;

use serde::{Deserialize, Serialize};
use tracing::*;
use apiexts::CustomResourceDefinition;
use k8s_openapi::{apiextensions_apiserver::pkg::apis::apiextensions::v1 as apiexts, serde, api::core::v1::Node};
use k8s_openapi::api::core::v1::Pod;

use kube::{
  api::{Api, Patch, PatchParams,ListParams},
  runtime::wait::{await_condition, conditions},
  runtime::{watcher, WatchStreamExt},
  Client, CustomResource, CustomResourceExt,
};

// TopologyCRD
#[derive(CustomResource, Deserialize, Serialize, Clone, Debug, JsonSchema)]
#[kube(
group = "yurikrupnik.dev",
version = "v1",
kind = "Topology",
namespaced
)]
#[kube(status = "TopologyStatus")]
#[kube(scale = r#"{"specReplicasPath":".spec.replicas", "statusReplicasPath":".status.replicas"}"#)]
struct TopologySpec {
  pub name: String,
  pub info: String,
  pub nodes: Vec<String>,
  pub image: Option<String>,
  // pub replicas: u64,
  // pub shit: bool
}

#[derive(Deserialize, Serialize, Clone, Debug, Default, JsonSchema)]
struct TopologyStatus {
  pub is_bad: bool,
  pub is_good: bool,
}

const CRD_NAME : &str = "topologies.yurikrupnik.dev";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  tracing_subscriber::fmt::init();
  let client = Client::try_default().await?;

  let ssapply = PatchParams::apply("topology_apply").force();
  // 0. Ensure the CRD is installed, could do this once
  let crds: Api<CustomResourceDefinition> = Api::all(client.clone());
  // info!("Creating crd: {}", serde_yaml::to_string(&Topology::crd())?);
  crds.patch(CRD_NAME, &ssapply, &Patch::Apply(Topology::crd()))
    .await?;

  info!("Waiting for the api-server to accept the CRD");
  let establish = await_condition(crds, CRD_NAME, conditions::is_crd_established());
  let _ = tokio::time::timeout(std::time::Duration::from_secs(10), establish).await?;

  // Let's get the current node topology
  // let nodes: Api<Node> = Api::all(client.clone());
  // New client copy to inject our resource
  let topologys: Api<Topology> = Api::default_namespaced(client.clone());
  // let s = Topology::new("das", TopologySpec{
  //   info: "ds".to_string(),
  //   image: Some("nginx".to_string()) ,
  //   nodes: vec![],
  //   name: "name".to_string()
  // });
  // let spec = create_spec(nodes).await;
  // println!("dama {:?}", spec);
  // println!("dama {spec:?}");
  // let tt = topologys.patch(
  //   "default",
  //   &ssapply,
  //   &Patch::Apply(&Topology::new("default", spec))
  // ).await?;
  // info!("Applied 1 {}: {:?}", tt.name_any(), tt.spec);


  // watch the topology resources
  let obs = watcher(topologys, ListParams::default()).applied_objects();
  pin_mut!(obs);
  while let Some(o) = obs.try_next().await? {
    let _node = o;
    {
      let nodes: Api<Node> = Api::all(client.clone());
      // info!("nodes {nodes:?}");
      let spec = create_spec(nodes.clone()).await;
      // println!("omg spec!!! {:?}", spec);
      // println!("omg spec!!! {spec:?}");
      let topologys: Api<Topology> = Api::default_namespaced(client.clone());
      let pods: Api<Pod> = Api::default_namespaced(client.clone());
      // let list = Pod::list_for_all_namespaces();
      // let s = pods.create(&PostParams::default(), spec).await?;
      // pods.create("", TopologySpec {});
      // println!("omg topologys!!! {:?}", topologys);
      println!("omg pods!!! {pods:?}");
      println!("omg topologys!!! {topologys:?}");

      let _tt = topologys.patch("default",
                               &ssapply,
                               &Patch::Apply(&Topology::new("default",
                                                            spec))).await?;
    }
  }

  Ok(())
}
async fn create_spec(nodes: Api<Node>) -> TopologySpec {
  nodes.list(&ListParams::default()).await.expect("TODO: panic message");
  let node_list = nodes.list(&ListParams::default()).await.unwrap();

  // let node_namess = node_list
  //   .iter()
  //   .map(|node| node.namespace())
  //   .for_each(|name| info!("{:?}", name));
    // .collect();
  // info!("node_namess {:?}", node_namess);
  let mut node_names = Vec::new();
  for node in node_list {
    node_names.push(node.metadata.name.unwrap());
    // node_names.push(node.metadata.namespace.unwrap());
  }
  TopologySpec {
    name: "default".to_string(),
    nodes: node_names,
    info: "info jhere".to_string(),
    image: Some("nginx".to_string())
  }
}
