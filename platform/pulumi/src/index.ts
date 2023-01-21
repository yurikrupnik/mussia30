import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
// import * as aws from '@pulumi/aws';
// import * as random from '@pulumi/random';
// import * as path from "path";

// Check, and don't deploy on Friday
// const dayOfWeek = new Date().getDay();
// if (!pulumi.runtime.isDryRun() && dayOfWeek === 5) {
//   throw new Error("Don't deploy on Friday!");
// } else if (!pulumi.runtime.isDryRun()) {
//   console.log('Not a Friday. Continuing...');
// }

// const s = new aws.s3.Bucket('ds', {
//   // versioning: true,
// });

// This is the path to the other project relative to the CWD
// const projectRoot = '../users-api';

const config = new pulumi.Config();

const region = config.get('region') || 'me-west1';
const project = config.get('project') || 'mussia30';

// const password = new random.RandomPassword('password', {
//   length: 16
// });

// const gcp = new gcp.secretmanager.Sec
// pulumi.output(gcp.secretmanager.getSecret({
//   secretId: "projects/50185966089/secrets/secret1",
//   // secretId: "secret1",
//   project,
// }));
// const projects = gcp.organizations.getProject({
//   projectId: project
// });
//
// const gcpConfig = new pulumi.Config("gcp")
// // gcpConfig.requireSecret("")
// const secret = config.requireSecret("key")
// const secret1 = config.getSecret("key")
//
// export const p1 = projects.then((s) => {
//   return s.billingAccount;
// });

const services = ['iamcredentials.googleapis.com'];

// enable service for
// const iamcredentials = new gcp.projects.Service('iam-credentials', {
//   disableDependentServices: true,
//   project,
//   service: 'iamcredentials.googleapis.com',
// });

services.forEach((service) => {
  new gcp.projects.Service('iam-credentials', {
    disableDependentServices: true,
    project,
    service,
  });
});

// service account
const sa = new gcp.serviceaccount.Account('gh-sa', {
  project,
  accountId: 'github-actions-sa',
  disabled: false,
  description: 'Github actions service account to create docker images',
  displayName: 'docker-sa',
});

const pool = new gcp.iam.WorkloadIdentityPool('example-pool-pulumi', {
  workloadIdentityPoolId: 'example-pool-pulumi',
  project,
});

const example = new gcp.iam.WorkloadIdentityPoolProvider(
  'example-pool-provider-pulumi',
  {
    workloadIdentityPoolId: pool.workloadIdentityPoolId,
    workloadIdentityPoolProviderId: 'example-prvdr',
    displayName: 'pulumi stam',
    // disabled: true,
    attributeMapping: {
      'google.subject': 'assertion.sub',
      'attribute.actor': 'assertion.actor',
      'attribute.repository': 'assertion.repository',
    },
    oidc: {
      issuerUri: 'https://token.actions.githubusercontent.com',
    },
  }
);

const repos = ['yurikrupnik/mussia30'];

// const members = pulumi.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/${repos[0]}`;

const members = repos.map((repo) => {
  return pulumi.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/${repo}`;
});

new gcp.serviceaccount.IAMBinding('account1', {
  serviceAccountId: sa.id,
  role: 'roles/iam.workloadIdentityUser',
  // members: [`principalSet://iam.googleapis.com/projects/392203877674/locations/global/workloadIdentityPools/example-pool-pulumi/attribute.repository/${repos[0]}`],
  // members: [`principalSet://iam.googleapis.com/projects/gcp-playground-365316/locations/global/workloadIdentityPools/example-pool-pulumi/attribute.repository/${repos[0]}`],
  members,
  // members: [members],
});

export const workload_identity_provider = example.name;

const secretManager = new gcp.projects.Service('secret-manager', {
  disableDependentServices: true,
  project,
  disableOnDestroy: true,
  service: 'secretmanager.googleapis.com',
});

// const secret_basic = new gcp.secretmanager.Secret("secret-basic", {
//   labels: {
//     label: "my-label",
//   },
//   replication: {
//     userManaged: {
//       replicas: [
//         {
//           location: "us-central1",
//         },
//         {
//           location: "us-east1",
//         },
//       ],
//     },
//   },
//   secretId: "secret",
// });

// export const config1 = gcpConfig;
// export const s1 = secret;
// export const s2 = secret1;

// const temp = new gcp.storage.Bucket('temp-bucket', {
//   name: `${project}-temp-bucket`,
//   location: region,
//   forceDestroy: true,
//   labels: {
//     type: 'temp',
//     team: 'util',
//   },
// });
