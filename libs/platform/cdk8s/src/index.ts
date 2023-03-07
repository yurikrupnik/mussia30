import { App, Chart, ChartProps } from 'cdk8s';
// import { ConfigMap, Namespace, ServiceAccount } from 'cdk8s-plus-24';
// import {MyChart}  from './src/deployment';
import { Construct } from 'constructs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { k8s, argoproj } from '@nx-multi-cloud/k8s-resources';

// works
// when array of imports in tsconfig.base.json, does not show type but works also
// import { IntOrString } from '@nx-multi-cloud/imports/k8s';
import { IntOrString } from '../imports/k8s';
import { ConfigMap, Namespace, ServiceAccount, Pod } from 'cdk8s-plus-25';
// import { doit } from '@nx-multi-cloud/k8s-shit';
// import { platformCdk8s } from '@mussia30/platform/cdk8s';
// fails
import { WebService } from './lib/platform-cdk8s';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);
    // TODO resolve - ref https://cdk8s.io/docs/latest/basics/helm/
    // new Helm(this, 'redis', {
    //   chart: 'bitnami/redis',
    //   values: {
    //     // sentinel: {
    //     //   enabled: true
    //     // }
    //   }
    // });
    // const dashboard = new Include(this, 'dashboard', {
    //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    //   url: `${__dirname}/lib/argocd.yaml`,
    // });
    // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
    // if (deploymentApiObject) {
    //   console.log('deploymentApiObject.name', deploymentApiObject.name);
    // }
    // serviceAccount.permissions.
    const namespace = new Namespace(this, 'namespace', {
      metadata: {
        name: 'users',
        // namespace: 'users',
        annotations: {},
        labels: {},
        finalizers: [],
        // ownerReferences: ''
      },
    });

    // const kaniko = new Pod(this, 'kaniko', {
    //   volumes: [
    //     {
    //       // name: 'ads',
    //       // config: "da",
    //       // node: ""
    //     },
    //   ],
    //   metadata: {},
    // });
    // console.log('doit', doit());
    console.log('namespace', namespace);
    const serviceAccount = new ServiceAccount(this, 'sa', {
      metadata: {
        name: 'users-sa',
        namespace: namespace.name,
        labels: {
          account: 'users-client',
        },
        annotations: {
          annotations: 'annotation1',
        },
      },
      secrets: [],
      automountToken: true,
    });
    console.log('serviceAccount', serviceAccount.name);

    // new ConfigMap(this, 'proxy-envs', {
    //   metadata: {
    //     name: 'proxy-envs',
    //   },
    //   data: {
    //     upstream_host: 'users-api-service',
    //     upstream_port: '8080',
    //     upstream_name: 'backend',
    //   },
    // });
    //
    new ConfigMap(this, 'nginx-config', {
      metadata: {
        finalizers: [],
        // labels: {
        // label1: IntOrString.fromString('label-value1').value,
        // label3: IntOrString.fromString('label-value3').value,
        // label2: 'label-value2',
        // },
        name: 'nginx-config',
        annotations: {
          annotation1: 'annotation1',
          annotation2: 'annotation2',
        },
        namespace: namespace.name,
      },
      data: {
        stam: 'my data here',
        // "nginx-config":
        // "more-data": "more of my data here"
      },
    });
    new WebService(this, 'api', {
      image: 'nginx',
      replicas: 1,
      namespace: namespace.name,
    });
    new WebService(this, 'web', {
      image: 'nginx',
      containerPort: 80,
      namespace: namespace.name,
    });
  }
}

const app = new App({});
new MyChart(app, 'cdk8s-example', {
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});

// new MyChart(app, 'second-example', {
//   // replicas: 4
//   // image: "shit",
//   // tag: "latest",
// });
app.synth();
