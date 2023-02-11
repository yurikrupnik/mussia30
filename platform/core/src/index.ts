// import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const static_site = new gcp.storage.Bucket("static-site", {
  cors: [{
    maxAgeSeconds: 3600,
    methods: [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE"
    ],
    origins: ["http://image-store.com"],
    responseHeaders: ["*"]
  }],
  forceDestroy: true,
  location: "EU",
  uniformBucketLevelAccess: true,
  website: {
    mainPageSuffix: "index.html",
    notFoundPage: "404.html"
  }
});
