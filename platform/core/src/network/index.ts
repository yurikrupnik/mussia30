import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { camelCase } from 'lodash';
import { Bucket } from '@pulumi/gcp/storage';
import { FunctionArgs } from '@pulumi/gcp/cloudfunctions';
// import { Service } from '@pulumi/gcp/projects';
// import { ResourceOptions } from "@pulumi/pulumi/resource";

export interface GcpNetworkResourceProps {
  name: string;
  // functionArgs: FunctionArgs;
  // // region: string;
  // path: string;
  // bucket: Bucket;
  // member?: string;
  // eventTrigger?: FunctionArgs["eventTrigger"],
  // environmentVariables?: FunctionArgs['environmentVariables'];
  // dependsOn?: Promise<Array<Service>>
}

export class GcpNetworkResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    gcpNetworkProps: GcpNetworkResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super('mussia30:network:vpc:', name, {}, opts);
    // const { name } = gcpNetworkProps;

    const vpcNetwork = new gcp.compute.Network(
      'vpc-network-inner',
      {
        // autoCreateSubnetworks: true,
        autoCreateSubnetworks: false,
        // mtu: 1460,
        // project: "my-project-name",
      },
      { parent: this, ...opts }
    );

    const customSest = new gcp.compute.Network(
      'custom-test',
      {
        autoCreateSubnetworks: false,
      },
      { parent: this, ...opts }
    );

    // const network_with_private_secondary_ip_ranges = new gcp.compute.Subnetwork(
    //   'network-with-private-secondary-ip-ranges',
    //   {
    //     ipCidrRange: '10.2.0.0/16',
    //     region: 'us-central1',
    //     network: customSest.id,
    //     secondaryIpRanges: [
    //       {
    //         rangeName: 'tf-test-secondary-range-update1',
    //         ipCidrRange: '192.168.10.0/24',
    //       },
    //     ],
    //     logConfig: {
    //       aggregationInterval: 'INTERVAL_10_MIN',
    //       flowSampling: 0.5,
    //       metadata: 'INCLUDE_ALL_METADATA',
    //     },
    //   }
    // );
  }
}
