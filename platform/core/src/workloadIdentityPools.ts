import * as gcp from '@pulumi/gcp';
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const region = config.get('region') || 'me-west1';
const project = config.get('project') || 'mussia30';

const services = ['iamcredentials.googleapis.com'];

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
  workloadIdentityPoolId: 'mussia30-example',
  project,
});

const example = new gcp.iam.WorkloadIdentityPoolProvider(
  'example-pool-provider-pulumi',
  {
    workloadIdentityPoolId: pool.workloadIdentityPoolId,
    workloadIdentityPoolProviderId: 'example-provider',
    displayName: 'pulumi-github-integration',
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

const members = repos.map((repo) => {
  return pulumi.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/${repo}`;
});

new gcp.serviceaccount.IAMBinding('account1', {
  serviceAccountId: sa.id,
  role: 'roles/iam.workloadIdentityUser',
  members,
});

export const workload_identity_provider = example.name;

const secretManager = new gcp.projects.Service('secret-manager', {
  disableDependentServices: true,
  project,
  disableOnDestroy: true,
  service: 'secretmanager.googleapis.com',
});


export class WorkloadIdentityPools extends pulumi.ComponentResource {
  constructor(name: string, event: EventClass, opts?: pulumi.ResourceOptions) {
    super('mussia30:security:WorkloadIdentityPools:', name, {}, opts);
    const {
      bigquerySchema,
      funcs,
      bucket,
      eventStorageJob,
      tempBucket,
      dataset,
      avroSchema,
    } = event;

    const schema = new gcp.pubsub.Schema(
      name,
      {
        name,
        type: 'AVRO',
        definition: generateAvro(avroSchema),
      },
      { parent: this }
    );

    const topic = new gcp.pubsub.Topic(
      name,
      {
        name,
        schemaSettings: {
          schema: schema.id,
          encoding: 'JSON',
        },
      },
      { parent: this }
    );

    const eventBucket =
      bucket ||
      new gcp.storage.Bucket(
        `${project}-${name}`,
        {
          name: `${project}-${name}`,
          location: region,
          forceDestroy: true,
        },
        { parent: this }
      );

    eventStorageJob.map((job) => {
      const { templateGcsPath } = job;
      const textOrAvro = last(
        templateGcsPath.toString().split('_')
      ).toLocaleLowerCase();
      return new gcp.dataflow.Job(
        `${name}-ps-to-gcs-${textOrAvro}`,
        {
          ...job,
          name: `${name}-ps-to-gcs-${textOrAvro}`,
          parameters: Object.assign({}, job.parameters, {
            inputTopic: topic.id,
            outputDirectory: eventBucket.url,
            outputFilenamePrefix:
              textOrAvro === 'text' ? `${name}-ps-to-${textOrAvro}` : undefined,
            avroTempDirectory:
              textOrAvro === 'avro' ? tempBucket.url : undefined,
          }),
        },
        { parent: this }
      );
    });
    // if (Array.isArray(eventStorageJob)) {
    // } else {
    // }
    // const pubsubToText = new gcp.dataflow.Job(`${name}-ps-to-gcs-text`, {
    //   region,
    //   name: `${name}-ps-to-gcs-text`,
    //   templateGcsPath: 'gs://dataflow-templates/latest/Cloud_PubSub_to_GCS_Text',
    //   tempGcsLocation: temp.url,
    //   parameters: {
    //     inputTopic: topic.id,
    //     outputDirectory: eventBucket.url,
    //     outputFilenamePrefix: `${name}-ps-to-text`,
    //   },
    //   onDelete: 'cancel',
    // });
    //
    // const pubsubToAvro = new gcp.dataflow.Job(`${name}-ps-to-avro`, {
    //   region,
    //   name: `${name}-ps-to-avro`,
    //   templateGcsPath: 'gs://dataflow-templates/latest/Cloud_PubSub_to_Avro',
    //   tempGcsLocation: temp.url,
    //   parameters: {
    //     inputTopic: topic.id,
    //     outputDirectory: eventBucket.url,
    //     avroTempDirectory: temp.url,
    //   },
    //   onDelete: 'cancel',
    // });

    // bigquery start
    if (bigquerySchema) {
      const table = new gcp.bigquery.Table(
        name,
        {
          datasetId: dataset.datasetId,
          tableId: name,
          deletionProtection: false,
          timePartitioning: {
            type: 'MONTH',
          },
          labels: {
            env: 'default',
            event: name,
          },
          schema: JSON.stringify(bigquerySchema),
        },
        { parent: this }
      );

      const bigquery_streaml = new gcp.dataflow.Job(
        `${name}-ps-to-bq`,
        {
          templateGcsPath:
            'gs://dataflow-templates-europe-north1/latest/PubSub_to_BigQuery',
          tempGcsLocation: tempBucket.url,
          parameters: {
            inputTopic: topic.id,
            outputTableSpec: pulumi.interpolate`${project}:${table.datasetId}.${name}`,
          },
          onDelete: 'cancel',
        },
        { parent: this }
      );
    }
    // bigquery end

    // functions start
    if (funcs.length) {
      const updatedFuncs = funcs.map((v) => {
        let resource;
        if (v.eventTrigger.eventType) {
          if (v.eventTrigger.eventType.includes('storage')) {
            resource = eventBucket.name;
          } else if (v.eventTrigger.eventType.includes('topic')) {
            resource = topic.id;
          }
          v.eventTrigger = Object.assign({}, v.eventTrigger, {
            resource,
          });
        }
        return v;
      });

      updatedFuncs.map((func) => {
        return new GcpFunctionResource(func.name, func, { parent: this });
      });
      // createGcpFunctions(updatedFuncs);
    }
    // functions end
  }
}
