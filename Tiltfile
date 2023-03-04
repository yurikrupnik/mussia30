
#k8s_yaml(local('helm template --set key1=val1,key2=val2 ./charts/main-chart'))
#watch_file('/charts/main-chart')

# include('./k8s/helm/Tiltfile')

# local_resource('pnpm', cmd='pnpm install', deps=['package.json'], labels=['pnpm'])

local_resource('proto-generate', cmd='just proto-generate', deps=['_proto/'], labels=['just'])


# local_resource('kubse-logs', serve_cmd='kubectl get pods -A', labels=['k9s'])

include('./apps/go/api-rest/Tiltfile')
include('./apps/node/api-rest/Tiltfile')
include('./apps/frontend/host/Tiltfile')
include('./apps/node/users-grpc/Tiltfile')

# include('./deno/nest-app/Tiltfile')

# Platform creating k8s assets
include('./libs/platform/cdk8s/Tiltfile')
# k8s_resource("argocd-server-59d9b8cb46-r28tk", port_forwards="3065:8080")

# include('./apps/rust/api-rest/Tiltfile')
# include('./apps/rust/users-grpc/Tiltfile')
# include('./apps/infra/commdands/Tiltfile')

# k8s_yaml(kustomize('k8s/base'))
# k8s_resource("go-api-rest", port_forwards="5001:8080")

load('ext://uibutton', 'cmd_button', 'location', 'text_input', 'bool_input')


cmd_button(name='NX',
        argv=['sh', '-c','pnpm nx $type --parallel --max-parallel=$cores $SKIP_CASHE --target=$TARGET'],
        text='NX',
        location=location.NAV,
        requires_confirmation=True,
        inputs=[
            text_input('type', placeholder='Enter your nx command type', default="affected"),
            text_input('TARGET', placeholder='Enter your nx command target', default="test"),
            bool_input('SKIP_CASHE', true_string='--skip-nx-cache', false_string=''),
            text_input('cores', placeholder='Enter value or --max-parallel', default="2"),
        ],
        icon_name='travel_explore')
    
cmd_button(name='Graph',
        argv=['sh', '-c','pnpm nx affected:dep-graph'],
        text='Graph',
        location=location.NAV,
        inputs=[
            bool_input('AFFECTED', true_string='affected:', false_string=''),
        ],
        icon_name='grain')

cmd_button(name='bazel-build',
    argv=['sh', '-c','bazel build'],
    text='NX',
    location=location.NAV,
    requires_confirmation=False,
    inputs=[
    text_input('type', placeholder='Enter your nx command type', default="affected"),
    text_input('TARGET', placeholder='Enter your nx command target', default="test"),
    bool_input('SKIP_CASHE', true_string='--skip-nx-cache', false_string=''),
    text_input('cores', placeholder='Enter value or --max-parallel', default="2"),
    ],
    icon_name='travel_explore')