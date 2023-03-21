import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from '../shared/types';

interface ServicesResourceProps {
  services: Array<string>;
  project?: string;
  provider?: Providers;
}

export class ServicesResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    servicesResourceProps: ServicesResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super('mussia30:core:service:', name, {}, opts);
    servicesResourceProps.services.map((service) => {
      return new gcp.projects.Service(
        service,
        {
          disableDependentServices: true,
          service,
        },
        { parent: this, ...opts }
      );
    });
  }
}
