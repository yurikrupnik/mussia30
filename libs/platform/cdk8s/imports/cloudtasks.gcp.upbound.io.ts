// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Queue is the Schema for the Queues API. A named resource to which messages are sent by publishers.
 *
 * @schema Queue
 */
export class Queue extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Queue"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'cloudtasks.gcp.upbound.io/v1beta1',
    kind: 'Queue',
  }

  /**
   * Renders a Kubernetes manifest for "Queue".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: QueueProps): any {
    return {
      ...Queue.GVK,
      ...toJson_QueueProps(props),
    };
  }

  /**
   * Defines a "Queue" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: QueueProps) {
    super(scope, id, {
      ...Queue.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Queue.GVK,
      ...toJson_QueueProps(resolved),
    };
  }
}

/**
 * Queue is the Schema for the Queues API. A named resource to which messages are sent by publishers.
 *
 * @schema Queue
 */
export interface QueueProps {
  /**
   * @schema Queue#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * QueueSpec defines the desired state of Queue
   *
   * @schema Queue#spec
   */
  readonly spec: QueueSpec;

}

/**
 * Converts an object of type 'QueueProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueProps(obj: QueueProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_QueueSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * QueueSpec defines the desired state of Queue
 *
 * @schema QueueSpec
 */
export interface QueueSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
   *
   * @schema QueueSpec#deletionPolicy
   */
  readonly deletionPolicy?: QueueSpecDeletionPolicy;

  /**
   * @schema QueueSpec#forProvider
   */
  readonly forProvider: QueueSpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema QueueSpec#providerConfigRef
   */
  readonly providerConfigRef?: QueueSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema QueueSpec#providerRef
   */
  readonly providerRef?: QueueSpecProviderRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema QueueSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: QueueSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema QueueSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: QueueSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'QueueSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpec(obj: QueueSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_QueueSpecForProvider(obj.forProvider),
    'providerConfigRef': toJson_QueueSpecProviderConfigRef(obj.providerConfigRef),
    'providerRef': toJson_QueueSpecProviderRef(obj.providerRef),
    'publishConnectionDetailsTo': toJson_QueueSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_QueueSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
 *
 * @schema QueueSpecDeletionPolicy
 */
export enum QueueSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema QueueSpecForProvider
 */
export interface QueueSpecForProvider {
  /**
   * Overrides for task-level appEngineRouting. These settings apply only to App Engine tasks in this queue Structure is documented below.
   *
   * @schema QueueSpecForProvider#appEngineRoutingOverride
   */
  readonly appEngineRoutingOverride?: QueueSpecForProviderAppEngineRoutingOverride[];

  /**
   * The location of the queue
   *
   * @schema QueueSpecForProvider#location
   */
  readonly location: string;

  /**
   * The ID of the project in which the resource belongs. If it is not provided, the provider project is used.
   *
   * @schema QueueSpecForProvider#project
   */
  readonly project?: string;

  /**
   * Reference to a Project in cloudplatform to populate project.
   *
   * @schema QueueSpecForProvider#projectRef
   */
  readonly projectRef?: QueueSpecForProviderProjectRef;

  /**
   * Selector for a Project in cloudplatform to populate project.
   *
   * @schema QueueSpecForProvider#projectSelector
   */
  readonly projectSelector?: QueueSpecForProviderProjectSelector;

  /**
   * Rate limits for task dispatches. The queue's actual dispatch rate is the result of:
   *
   * @schema QueueSpecForProvider#rateLimits
   */
  readonly rateLimits?: QueueSpecForProviderRateLimits[];

  /**
   * Settings that determine the retry behavior. Structure is documented below.
   *
   * @schema QueueSpecForProvider#retryConfig
   */
  readonly retryConfig?: QueueSpecForProviderRetryConfig[];

  /**
   * Configuration options for writing logs to Stackdriver Logging. Structure is documented below.
   *
   * @schema QueueSpecForProvider#stackdriverLoggingConfig
   */
  readonly stackdriverLoggingConfig?: QueueSpecForProviderStackdriverLoggingConfig[];

}

/**
 * Converts an object of type 'QueueSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProvider(obj: QueueSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'appEngineRoutingOverride': obj.appEngineRoutingOverride?.map(y => toJson_QueueSpecForProviderAppEngineRoutingOverride(y)),
    'location': obj.location,
    'project': obj.project,
    'projectRef': toJson_QueueSpecForProviderProjectRef(obj.projectRef),
    'projectSelector': toJson_QueueSpecForProviderProjectSelector(obj.projectSelector),
    'rateLimits': obj.rateLimits?.map(y => toJson_QueueSpecForProviderRateLimits(y)),
    'retryConfig': obj.retryConfig?.map(y => toJson_QueueSpecForProviderRetryConfig(y)),
    'stackdriverLoggingConfig': obj.stackdriverLoggingConfig?.map(y => toJson_QueueSpecForProviderStackdriverLoggingConfig(y)),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema QueueSpecProviderConfigRef
 */
export interface QueueSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema QueueSpecProviderConfigRef#policy
   */
  readonly policy?: QueueSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'QueueSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecProviderConfigRef(obj: QueueSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_QueueSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema QueueSpecProviderRef
 */
export interface QueueSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecProviderRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema QueueSpecProviderRef#policy
   */
  readonly policy?: QueueSpecProviderRefPolicy;

}

/**
 * Converts an object of type 'QueueSpecProviderRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecProviderRef(obj: QueueSpecProviderRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_QueueSpecProviderRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema QueueSpecPublishConnectionDetailsTo
 */
export interface QueueSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema QueueSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: QueueSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema QueueSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: QueueSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema QueueSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'QueueSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecPublishConnectionDetailsTo(obj: QueueSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_QueueSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_QueueSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema QueueSpecWriteConnectionSecretToRef
 */
export interface QueueSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema QueueSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema QueueSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'QueueSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecWriteConnectionSecretToRef(obj: QueueSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * @schema QueueSpecForProviderAppEngineRoutingOverride
 */
export interface QueueSpecForProviderAppEngineRoutingOverride {
  /**
   * App instance. By default, the task is sent to an instance which is available when the task is attempted.
   *
   * @schema QueueSpecForProviderAppEngineRoutingOverride#instance
   */
  readonly instance?: string;

  /**
   * App service. By default, the task is sent to the service which is the default service when the task is attempted.
   *
   * @schema QueueSpecForProviderAppEngineRoutingOverride#service
   */
  readonly service?: string;

  /**
   * App version. By default, the task is sent to the version which is the default version when the task is attempted.
   *
   * @schema QueueSpecForProviderAppEngineRoutingOverride#version
   */
  readonly version?: string;

}

/**
 * Converts an object of type 'QueueSpecForProviderAppEngineRoutingOverride' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderAppEngineRoutingOverride(obj: QueueSpecForProviderAppEngineRoutingOverride | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'instance': obj.instance,
    'service': obj.service,
    'version': obj.version,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Reference to a Project in cloudplatform to populate project.
 *
 * @schema QueueSpecForProviderProjectRef
 */
export interface QueueSpecForProviderProjectRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecForProviderProjectRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema QueueSpecForProviderProjectRef#policy
   */
  readonly policy?: QueueSpecForProviderProjectRefPolicy;

}

/**
 * Converts an object of type 'QueueSpecForProviderProjectRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderProjectRef(obj: QueueSpecForProviderProjectRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_QueueSpecForProviderProjectRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Selector for a Project in cloudplatform to populate project.
 *
 * @schema QueueSpecForProviderProjectSelector
 */
export interface QueueSpecForProviderProjectSelector {
  /**
   * MatchControllerRef ensures an object with the same controller reference as the selecting object is selected.
   *
   * @schema QueueSpecForProviderProjectSelector#matchControllerRef
   */
  readonly matchControllerRef?: boolean;

  /**
   * MatchLabels ensures an object with matching labels is selected.
   *
   * @schema QueueSpecForProviderProjectSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

  /**
   * Policies for selection.
   *
   * @schema QueueSpecForProviderProjectSelector#policy
   */
  readonly policy?: QueueSpecForProviderProjectSelectorPolicy;

}

/**
 * Converts an object of type 'QueueSpecForProviderProjectSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderProjectSelector(obj: QueueSpecForProviderProjectSelector | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'matchControllerRef': obj.matchControllerRef,
    'matchLabels': ((obj.matchLabels) === undefined) ? undefined : (Object.entries(obj.matchLabels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'policy': toJson_QueueSpecForProviderProjectSelectorPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * @schema QueueSpecForProviderRateLimits
 */
export interface QueueSpecForProviderRateLimits {
  /**
   * The maximum number of concurrent tasks that Cloud Tasks allows to be dispatched for this queue. After this threshold has been reached, Cloud Tasks stops dispatching tasks until the number of concurrent requests decreases.
   *
   * @schema QueueSpecForProviderRateLimits#maxConcurrentDispatches
   */
  readonly maxConcurrentDispatches?: number;

  /**
   * The maximum rate at which tasks are dispatched from this queue. If unspecified when the queue is created, Cloud Tasks will pick the default.
   *
   * @schema QueueSpecForProviderRateLimits#maxDispatchesPerSecond
   */
  readonly maxDispatchesPerSecond?: number;

}

/**
 * Converts an object of type 'QueueSpecForProviderRateLimits' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderRateLimits(obj: QueueSpecForProviderRateLimits | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'maxConcurrentDispatches': obj.maxConcurrentDispatches,
    'maxDispatchesPerSecond': obj.maxDispatchesPerSecond,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * @schema QueueSpecForProviderRetryConfig
 */
export interface QueueSpecForProviderRetryConfig {
  /**
   * Number of attempts per task. Cloud Tasks will attempt the task maxAttempts times (that is, if the first attempt fails, then there will be maxAttempts - 1 retries). Must be >= -1. If unspecified when the queue is created, Cloud Tasks will pick the default. -1 indicates unlimited attempts.
   *
   * @schema QueueSpecForProviderRetryConfig#maxAttempts
   */
  readonly maxAttempts?: number;

  /**
   * A task will be scheduled for retry between minBackoff and maxBackoff duration after it fails, if the queue's RetryConfig specifies that the task should be retried.
   *
   * @schema QueueSpecForProviderRetryConfig#maxBackoff
   */
  readonly maxBackoff?: string;

  /**
   * The time between retries will double maxDoublings times. A task's retry interval starts at minBackoff, then doubles maxDoublings times, then increases linearly, and finally retries retries at intervals of maxBackoff up to maxAttempts times.
   *
   * @schema QueueSpecForProviderRetryConfig#maxDoublings
   */
  readonly maxDoublings?: number;

  /**
   * If positive, maxRetryDuration specifies the time limit for retrying a failed task, measured from when the task was first attempted. Once maxRetryDuration time has passed and the task has been attempted maxAttempts times, no further attempts will be made and the task will be deleted. If zero, then the task age is unlimited.
   *
   * @schema QueueSpecForProviderRetryConfig#maxRetryDuration
   */
  readonly maxRetryDuration?: string;

  /**
   * A task will be scheduled for retry between minBackoff and maxBackoff duration after it fails, if the queue's RetryConfig specifies that the task should be retried.
   *
   * @schema QueueSpecForProviderRetryConfig#minBackoff
   */
  readonly minBackoff?: string;

}

/**
 * Converts an object of type 'QueueSpecForProviderRetryConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderRetryConfig(obj: QueueSpecForProviderRetryConfig | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'maxAttempts': obj.maxAttempts,
    'maxBackoff': obj.maxBackoff,
    'maxDoublings': obj.maxDoublings,
    'maxRetryDuration': obj.maxRetryDuration,
    'minBackoff': obj.minBackoff,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * @schema QueueSpecForProviderStackdriverLoggingConfig
 */
export interface QueueSpecForProviderStackdriverLoggingConfig {
  /**
   * Specifies the fraction of operations to write to Stackdriver Logging. This field may contain any value between 0.0 and 1.0, inclusive. 0.0 is the default and means that no operations are logged.
   *
   * @schema QueueSpecForProviderStackdriverLoggingConfig#samplingRatio
   */
  readonly samplingRatio: number;

}

/**
 * Converts an object of type 'QueueSpecForProviderStackdriverLoggingConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderStackdriverLoggingConfig(obj: QueueSpecForProviderStackdriverLoggingConfig | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'samplingRatio': obj.samplingRatio,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema QueueSpecProviderConfigRefPolicy
 */
export interface QueueSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema QueueSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: QueueSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema QueueSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: QueueSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'QueueSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecProviderConfigRefPolicy(obj: QueueSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema QueueSpecProviderRefPolicy
 */
export interface QueueSpecProviderRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema QueueSpecProviderRefPolicy#resolution
   */
  readonly resolution?: QueueSpecProviderRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema QueueSpecProviderRefPolicy#resolve
   */
  readonly resolve?: QueueSpecProviderRefPolicyResolve;

}

/**
 * Converts an object of type 'QueueSpecProviderRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecProviderRefPolicy(obj: QueueSpecProviderRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
 *
 * @schema QueueSpecPublishConnectionDetailsToConfigRef
 */
export interface QueueSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema QueueSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: QueueSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'QueueSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecPublishConnectionDetailsToConfigRef(obj: QueueSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_QueueSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema QueueSpecPublishConnectionDetailsToMetadata
 */
export interface QueueSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema QueueSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema QueueSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema QueueSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'QueueSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecPublishConnectionDetailsToMetadata(obj: QueueSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'annotations': ((obj.annotations) === undefined) ? undefined : (Object.entries(obj.annotations).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'labels': ((obj.labels) === undefined) ? undefined : (Object.entries(obj.labels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'type': obj.type,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema QueueSpecForProviderProjectRefPolicy
 */
export interface QueueSpecForProviderProjectRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema QueueSpecForProviderProjectRefPolicy#resolution
   */
  readonly resolution?: QueueSpecForProviderProjectRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema QueueSpecForProviderProjectRefPolicy#resolve
   */
  readonly resolve?: QueueSpecForProviderProjectRefPolicyResolve;

}

/**
 * Converts an object of type 'QueueSpecForProviderProjectRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderProjectRefPolicy(obj: QueueSpecForProviderProjectRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for selection.
 *
 * @schema QueueSpecForProviderProjectSelectorPolicy
 */
export interface QueueSpecForProviderProjectSelectorPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema QueueSpecForProviderProjectSelectorPolicy#resolution
   */
  readonly resolution?: QueueSpecForProviderProjectSelectorPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema QueueSpecForProviderProjectSelectorPolicy#resolve
   */
  readonly resolve?: QueueSpecForProviderProjectSelectorPolicyResolve;

}

/**
 * Converts an object of type 'QueueSpecForProviderProjectSelectorPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecForProviderProjectSelectorPolicy(obj: QueueSpecForProviderProjectSelectorPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema QueueSpecProviderConfigRefPolicyResolution
 */
export enum QueueSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema QueueSpecProviderConfigRefPolicyResolve
 */
export enum QueueSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema QueueSpecProviderRefPolicyResolution
 */
export enum QueueSpecProviderRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema QueueSpecProviderRefPolicyResolve
 */
export enum QueueSpecProviderRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema QueueSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface QueueSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema QueueSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: QueueSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema QueueSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: QueueSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'QueueSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_QueueSpecPublishConnectionDetailsToConfigRefPolicy(obj: QueueSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema QueueSpecForProviderProjectRefPolicyResolution
 */
export enum QueueSpecForProviderProjectRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema QueueSpecForProviderProjectRefPolicyResolve
 */
export enum QueueSpecForProviderProjectRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema QueueSpecForProviderProjectSelectorPolicyResolution
 */
export enum QueueSpecForProviderProjectSelectorPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema QueueSpecForProviderProjectSelectorPolicyResolve
 */
export enum QueueSpecForProviderProjectSelectorPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema QueueSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum QueueSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema QueueSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum QueueSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}
