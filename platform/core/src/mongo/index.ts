import * as mongodbatlas from '@pulumi/mongodbatlas';
import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { camelCase } from 'lodash';
import { Bucket } from '@pulumi/gcp/storage';
import { FunctionArgs } from '@pulumi/gcp/cloudfunctions';
import { Cluster } from '@pulumi/mongodbatlas';
// import { Service } from '@pulumi/gcp/projects';
// import { ResourceOptions } from "@pulumi/pulumi/resource";

export interface MongoInstance {
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

export class MongoInstanceResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    mongoInstance: MongoInstance,
    opts?: pulumi.ResourceOptions
  ) {
    super('mussia30:code:function:', name, {}, opts);
    const { functionArgs, bucket, path, member } = mongoInstance;
    // new mongodbatlas.Cluster('fd', {});
  }
}
