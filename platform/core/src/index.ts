import { first } from 'lodash';
import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import { ServicesResource } from './cloudServices';
import { Providers } from './shared/types';
// TODO! check activetate cloudbuild.googleapis.com for project 394442038451
// import * as aws from '@pulumi/aws';
// import * as k8s from '@pulumi/kubernetes';
// import { } from '@mussia30/'

// const appLabels = { app: 'nginx' };
// const deployment = new k8s.apps.v1.Deployment('nginx', {
//   spec: {
//     strategy: {
//       // type: ''
//     },
//     selector: { matchLabels: appLabels },
//     replicas: 1,
//     template: {
//       metadata: { labels: appLabels },
//       spec: { containers: [{ name: 'nginx', image: 'nginx' }] },
//     },
//   },
// });
// import * as alicloud from '@pulumi/alicloud';
//
// const vpc = new alicloud.vpc.Network('my-vpc', {
//   cidrBlock: '10.0.0.0/16',
// });

// const cloudidentity = new gcp.cloudidentity.Group('cloudidentity.Group', {
//   description: 'some',
// });

// const s3Bucket = new aws.s3.Bucket('storage.Bucket', {
//   p
// });
// s3Bucket.
// const GcsBucket = new gcp.storage.Bucket('storage.Bucket', {
//   // project
//   // ,
//   // ,
//   project: 'mussia30',
//   forceDestroy: true,
//   versioning: {
//     enabled: false,
//   },
//   website: {
//     mainPageSuffix: 'index.html',
//     notFoundPage: '404.html',
//   },
//   name: 'mussia30.com',
//   storageClass: 'STANDARD',
//   location: 'ue',
//   autoclass: {
//     enabled: true,
//   },
//   lifecycleRules: [
//     {
//       action: {
//         type: 'unified',
//         storageClass: 'STANDARD',
//       },
//       condition: {
//         //      createdBefore: "",
//         //      customTimeBefore: "",
//         //      daysSinceCustomTime: "",
//         //      daysSinceNoncurrentTime: "",
//       },
//     },
//   ],
//   // requesterPays: aws.s3.
// });
// Todo make libs work for pulumi
// import {GcpFunctionResource, GcpFunction} from '@mussia30/pulumi/gcp-function';
import { GcpFunction, GcpFunctionResource } from './gcpFunction';
import { GcpNetworkResource, GcpNetworkResourceProps } from './network';
import { Service } from '@pulumi/gcp/projects';

// import * as datadog from '@pulumi/datadog';
//
// const user = new datadog.User('my-policy', {
//   email: 'krupnik.yuri@gmail..com',
//   handle: 'krupnik.yuri@gmail..com',
//   name: 'New User',
// });
// new aws.lambda.Function('lomdba.getDataStam', {
//   s3Bucket: '',
//   name: 'getDataStam',
//   runtime: 'node18',
//   vpcConfig: {},
// });
const config = new pulumi.Config('core');
const nodeCount = config.get('nodeCount');

// functions are no active at me-west1
const gcpConfig = new pulumi.Config('gcp');
const region = gcpConfig.get('region');
const project = gcpConfig.get('project');

const tempBucket = new gcp.storage.Bucket('temp-bucket', {
  name: `${project}-temp-bucket`,
  location: region,
  forceDestroy: true,
  labels: {
    type: 'temp',
    team: 'util',
  },
});

const eventsBucket = new gcp.storage.Bucket('events-bucket', {
  name: `${project}-events-bucket`,
  location: region,
  forceDestroy: true,
  labels: {
    type: 'events',
    team: 'big-data',
  },
  versioning: { enabled: true },
  // website
});

const funcBucket = new gcp.storage.Bucket(`${project}-func-bucket`, {
  name: `${project}-func-bucket`,
  location: 'eu',
  // location: "EU",
  // location: region,
  forceDestroy: true,
  versioning: {
    enabled: true,
  },
  labels: {
    type: 'code',
  },
});

const dataset = new gcp.bigquery.Dataset('applications_events', {
  datasetId: 'applications_events',
  description: 'This is a test description',
  friendlyName: 'Test logs',
  location: region,
  // defaultTableExpirationMs: 3600000,
  labels: {
    env: 'default',
    name: 'aris-test',
  },
});

const functionsPath = '../../dist/apps/node/';

const servicesNames = [
  'cloudfunctions.googleapis.com',
  'cloudbuild.googleapis.com',
];

const GcpFunctionServices = new ServicesResource(
  'GcpFunctionServices',
  // services: servicesNames,
  { services: servicesNames, provider: Providers.gcp }
  // servicesNames
);


const functions: GcpFunction[] = [
  {
    name: 'dead',
    bucket: funcBucket,
    path: functionsPath,
    member: 'allUsers',
    functionArgs: {
      availableMemoryMb: 256,
      region,
      triggerHttp: true,
      entryPoint: 'dead',
      // name: "Aris",
      // project,
      sourceArchiveBucket: funcBucket.name,
      eventTrigger: undefined,
      runtime: 'nodejs18',
    },
  }
];

const funcs = functions.map((f) => {
  return new GcpFunctionResource(f.name, f, {
    dependsOn: GcpFunctionServices,
    // parent: functionServices.googleServices[0],
  });
});

// const myService = gcp.projects.getProjectService({
//   service: "cloudfunctions.googleapis.com",
//   project
// })
// const myService1 = gcp.projects.getProjectService({
//   service: "pubsub.googleapis.com",
// }).then((s) => {
//   console.log('s', s);
//   return s;
// });
// console.log('myService', myService);
// console.log('myService1', myService1);

const computeServices = new ServicesResource(
  'computeServices',
  {
    provider: Providers.gcp,
    services: ['compute.googleapis.com'],
  },
  {}
);

// const computeServiceLocal = new gcp.projects.Service('computeServices-manual', {
//   disableDependentServices: true,
//   // project,
//   service: 'compute.googleapis.com',
// });

// const s = new GcpNetworkResource(
//   `${project}-network`,
//   {
//     name: `${project}-network`,
//   }
//   // { dependsOn: computeServiceLocal }
// );

// Promise.all(funcs);

// const gcpStatic_site = new gcp.storage.Bucket('gcp-static-site', {
//   cors: [
//     {
//       maxAgeSeconds: 3600,
//       methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
//       origins: ['http://image-store.com'],
//       responseHeaders: ['*'],
//     },
//   ],
//   forceDestroy: true,
//   location: 'EU',
//   uniformBucketLevelAccess: true,
//   website: {
//     mainPageSuffix: 'index.html',
//     notFoundPage: '404.html',
//   },
// });

// const awsStatic_site = new aws.s3.Bucket('aws-static-site', {
//   // cors: [
//   //   {
//   //     maxAgeSeconds: 3600,
//   //     methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
//   //     origins: ['http://image-store.com'],
//   //     responseHeaders: ['*'],
//   //   },
//   // ],
//   forceDestroy: true,
//   // location: 'EU',
//   // uniformBucketLevelAccess: true,
//   website: {
//     indexDocument: 'index.html',
//
//     // mainPageSuffix: 'index.html',
//     // notFoundPage: '404.html',
//   },
// });
// const awssss = new aws.s3.Bucket('aws_bucket', {
//   versioning: {
//     enabled: true,
//   },
//   forceDestroy: true,
//   website: {},
// });
