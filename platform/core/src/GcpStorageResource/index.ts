import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { camelCase } from 'lodash';
import { Bucket } from '@pulumi/gcp/storage';
import { Bucket } from '@pulumi/aws/s3';
import { FunctionArgs } from '@pulumi/gcp/cloudfunctions';
// import { Service } from '@pulumi/gcp/projects';
// import { ResourceOptions } from "@pulumi/pulumi/resource";

export interface GcpStorageResourceProps {
  name: string;
  functionArgs: FunctionArgs;
  // region: string;
  path: string;
  bucket: Bucket;
  member?: string;
  // eventTrigger?: FunctionArgs["eventTrigger"],
  // environmentVariables?: FunctionArgs['environmentVariables'];
  // dependsOn?: Promise<Array<Service>>
}

export class GcpStorageResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    gcpStorageResourceProps: GcpStorageResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super('mussia30:code:function:', name, {}, opts);
    const { functionArgs, bucket, path, member } = gcpFunction;

    const archive = new gcp.storage.BucketObject(
      name,
      {
        name: `${name}.zip`,
        bucket: bucket.name,
        source: new pulumi.asset.FileArchive(`${path}${name}`),
      },
      // opts
      { parent: this, ...opts } as pulumi.ResourceOptions
    );
    const func = new gcp.cloudfunctions.Function(
      name,
      {
        // sourceArchiveBucket: bucket.name,
        sourceArchiveObject: archive.name,
        // triggerHttp: eventTrigger ? undefined : true,
        // eventTrigger: eventTrigger ? eventTrigger : undefined,
        entryPoint: camelCase(name),
        name,
        // environmentVariables,
        ...functionArgs,
        // serviceAccountEmail: '',
      },
      { parent: this, ...opts }
    );

    // if (member) {
    //   new gcp.cloudfunctions.FunctionIamMember(
    //     `${name}-invoker`,
    //     {
    //       project: func.project,
    //       region: func.region,
    //       cloudFunction: func.name,
    //       role: 'roles/cloudfunctions.invoker',
    //       member,
    //     },
    //     { parent: this, ...opts }
    //   );
    // }
  }
}
