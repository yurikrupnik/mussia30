// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Workflow is the Schema for the Workflows API. Workflow program to be executed by Workflows.
 *
 * @schema Workflow
 */
export class Workflow extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Workflow"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'workflows.gcp.upbound.io/v1beta1',
    kind: 'Workflow',
  }

  /**
   * Renders a Kubernetes manifest for "Workflow".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: WorkflowProps): any {
    return {
      ...Workflow.GVK,
      ...toJson_WorkflowProps(props),
    };
  }

  /**
   * Defines a "Workflow" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id, {
      ...Workflow.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Workflow.GVK,
      ...toJson_WorkflowProps(resolved),
    };
  }
}

/**
 * Workflow is the Schema for the Workflows API. Workflow program to be executed by Workflows.
 *
 * @schema Workflow
 */
export interface WorkflowProps {
  /**
   * @schema Workflow#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * WorkflowSpec defines the desired state of Workflow
   *
   * @schema Workflow#spec
   */
  readonly spec: WorkflowSpec;

}

/**
 * Converts an object of type 'WorkflowProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowProps(obj: WorkflowProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_WorkflowSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WorkflowSpec defines the desired state of Workflow
 *
 * @schema WorkflowSpec
 */
export interface WorkflowSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
   *
   * @schema WorkflowSpec#deletionPolicy
   */
  readonly deletionPolicy?: WorkflowSpecDeletionPolicy;

  /**
   * @schema WorkflowSpec#forProvider
   */
  readonly forProvider: WorkflowSpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema WorkflowSpec#providerConfigRef
   */
  readonly providerConfigRef?: WorkflowSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema WorkflowSpec#providerRef
   */
  readonly providerRef?: WorkflowSpecProviderRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema WorkflowSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: WorkflowSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema WorkflowSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: WorkflowSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'WorkflowSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpec(obj: WorkflowSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_WorkflowSpecForProvider(obj.forProvider),
    'providerConfigRef': toJson_WorkflowSpecProviderConfigRef(obj.providerConfigRef),
    'providerRef': toJson_WorkflowSpecProviderRef(obj.providerRef),
    'publishConnectionDetailsTo': toJson_WorkflowSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_WorkflowSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
 *
 * @schema WorkflowSpecDeletionPolicy
 */
export enum WorkflowSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema WorkflowSpecForProvider
 */
export interface WorkflowSpecForProvider {
  /**
   * Description of the workflow provided by the user. Must be at most 1000 unicode characters long.
   *
   * @schema WorkflowSpecForProvider#description
   */
  readonly description?: string;

  /**
   * A set of key/value label pairs to assign to this Workflow.
   *
   * @schema WorkflowSpecForProvider#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Name of the Workflow.
   *
   * @schema WorkflowSpecForProvider#name
   */
  readonly name?: string;

  /**
   * Creates a unique name beginning with the specified prefix. If this and name are unspecified, a random value is chosen for the name.
   *
   * @schema WorkflowSpecForProvider#namePrefix
   */
  readonly namePrefix?: string;

  /**
   * The ID of the project in which the resource belongs. If it is not provided, the provider project is used.
   *
   * @schema WorkflowSpecForProvider#project
   */
  readonly project?: string;

  /**
   * The region of the workflow.
   *
   * @schema WorkflowSpecForProvider#region
   */
  readonly region?: string;

  /**
   * Name of the service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account}.
   *
   * @schema WorkflowSpecForProvider#serviceAccount
   */
  readonly serviceAccount?: string;

  /**
   * Reference to a ServiceAccount in cloudplatform to populate serviceAccount.
   *
   * @schema WorkflowSpecForProvider#serviceAccountRef
   */
  readonly serviceAccountRef?: WorkflowSpecForProviderServiceAccountRef;

  /**
   * Selector for a ServiceAccount in cloudplatform to populate serviceAccount.
   *
   * @schema WorkflowSpecForProvider#serviceAccountSelector
   */
  readonly serviceAccountSelector?: WorkflowSpecForProviderServiceAccountSelector;

  /**
   * Workflow code to be executed. The size limit is 32KB.
   *
   * @schema WorkflowSpecForProvider#sourceContents
   */
  readonly sourceContents?: string;

}

/**
 * Converts an object of type 'WorkflowSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecForProvider(obj: WorkflowSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'description': obj.description,
    'labels': ((obj.labels) === undefined) ? undefined : (Object.entries(obj.labels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'name': obj.name,
    'namePrefix': obj.namePrefix,
    'project': obj.project,
    'region': obj.region,
    'serviceAccount': obj.serviceAccount,
    'serviceAccountRef': toJson_WorkflowSpecForProviderServiceAccountRef(obj.serviceAccountRef),
    'serviceAccountSelector': toJson_WorkflowSpecForProviderServiceAccountSelector(obj.serviceAccountSelector),
    'sourceContents': obj.sourceContents,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema WorkflowSpecProviderConfigRef
 */
export interface WorkflowSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema WorkflowSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema WorkflowSpecProviderConfigRef#policy
   */
  readonly policy?: WorkflowSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'WorkflowSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecProviderConfigRef(obj: WorkflowSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_WorkflowSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema WorkflowSpecProviderRef
 */
export interface WorkflowSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema WorkflowSpecProviderRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema WorkflowSpecProviderRef#policy
   */
  readonly policy?: WorkflowSpecProviderRefPolicy;

}

/**
 * Converts an object of type 'WorkflowSpecProviderRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecProviderRef(obj: WorkflowSpecProviderRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_WorkflowSpecProviderRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema WorkflowSpecPublishConnectionDetailsTo
 */
export interface WorkflowSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema WorkflowSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: WorkflowSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema WorkflowSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: WorkflowSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema WorkflowSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'WorkflowSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecPublishConnectionDetailsTo(obj: WorkflowSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_WorkflowSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_WorkflowSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema WorkflowSpecWriteConnectionSecretToRef
 */
export interface WorkflowSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema WorkflowSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema WorkflowSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'WorkflowSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecWriteConnectionSecretToRef(obj: WorkflowSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * Reference to a ServiceAccount in cloudplatform to populate serviceAccount.
 *
 * @schema WorkflowSpecForProviderServiceAccountRef
 */
export interface WorkflowSpecForProviderServiceAccountRef {
  /**
   * Name of the referenced object.
   *
   * @schema WorkflowSpecForProviderServiceAccountRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema WorkflowSpecForProviderServiceAccountRef#policy
   */
  readonly policy?: WorkflowSpecForProviderServiceAccountRefPolicy;

}

/**
 * Converts an object of type 'WorkflowSpecForProviderServiceAccountRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecForProviderServiceAccountRef(obj: WorkflowSpecForProviderServiceAccountRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_WorkflowSpecForProviderServiceAccountRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Selector for a ServiceAccount in cloudplatform to populate serviceAccount.
 *
 * @schema WorkflowSpecForProviderServiceAccountSelector
 */
export interface WorkflowSpecForProviderServiceAccountSelector {
  /**
   * MatchControllerRef ensures an object with the same controller reference as the selecting object is selected.
   *
   * @schema WorkflowSpecForProviderServiceAccountSelector#matchControllerRef
   */
  readonly matchControllerRef?: boolean;

  /**
   * MatchLabels ensures an object with matching labels is selected.
   *
   * @schema WorkflowSpecForProviderServiceAccountSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

  /**
   * Policies for selection.
   *
   * @schema WorkflowSpecForProviderServiceAccountSelector#policy
   */
  readonly policy?: WorkflowSpecForProviderServiceAccountSelectorPolicy;

}

/**
 * Converts an object of type 'WorkflowSpecForProviderServiceAccountSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecForProviderServiceAccountSelector(obj: WorkflowSpecForProviderServiceAccountSelector | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'matchControllerRef': obj.matchControllerRef,
    'matchLabels': ((obj.matchLabels) === undefined) ? undefined : (Object.entries(obj.matchLabels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'policy': toJson_WorkflowSpecForProviderServiceAccountSelectorPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema WorkflowSpecProviderConfigRefPolicy
 */
export interface WorkflowSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema WorkflowSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: WorkflowSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema WorkflowSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: WorkflowSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'WorkflowSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecProviderConfigRefPolicy(obj: WorkflowSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecProviderRefPolicy
 */
export interface WorkflowSpecProviderRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema WorkflowSpecProviderRefPolicy#resolution
   */
  readonly resolution?: WorkflowSpecProviderRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema WorkflowSpecProviderRefPolicy#resolve
   */
  readonly resolve?: WorkflowSpecProviderRefPolicyResolve;

}

/**
 * Converts an object of type 'WorkflowSpecProviderRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecProviderRefPolicy(obj: WorkflowSpecProviderRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecPublishConnectionDetailsToConfigRef
 */
export interface WorkflowSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: WorkflowSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'WorkflowSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecPublishConnectionDetailsToConfigRef(obj: WorkflowSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_WorkflowSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema WorkflowSpecPublishConnectionDetailsToMetadata
 */
export interface WorkflowSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'WorkflowSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecPublishConnectionDetailsToMetadata(obj: WorkflowSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecForProviderServiceAccountRefPolicy
 */
export interface WorkflowSpecForProviderServiceAccountRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema WorkflowSpecForProviderServiceAccountRefPolicy#resolution
   */
  readonly resolution?: WorkflowSpecForProviderServiceAccountRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema WorkflowSpecForProviderServiceAccountRefPolicy#resolve
   */
  readonly resolve?: WorkflowSpecForProviderServiceAccountRefPolicyResolve;

}

/**
 * Converts an object of type 'WorkflowSpecForProviderServiceAccountRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecForProviderServiceAccountRefPolicy(obj: WorkflowSpecForProviderServiceAccountRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecForProviderServiceAccountSelectorPolicy
 */
export interface WorkflowSpecForProviderServiceAccountSelectorPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema WorkflowSpecForProviderServiceAccountSelectorPolicy#resolution
   */
  readonly resolution?: WorkflowSpecForProviderServiceAccountSelectorPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema WorkflowSpecForProviderServiceAccountSelectorPolicy#resolve
   */
  readonly resolve?: WorkflowSpecForProviderServiceAccountSelectorPolicyResolve;

}

/**
 * Converts an object of type 'WorkflowSpecForProviderServiceAccountSelectorPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecForProviderServiceAccountSelectorPolicy(obj: WorkflowSpecForProviderServiceAccountSelectorPolicy | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecProviderConfigRefPolicyResolution
 */
export enum WorkflowSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema WorkflowSpecProviderConfigRefPolicyResolve
 */
export enum WorkflowSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema WorkflowSpecProviderRefPolicyResolution
 */
export enum WorkflowSpecProviderRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema WorkflowSpecProviderRefPolicyResolve
 */
export enum WorkflowSpecProviderRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema WorkflowSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface WorkflowSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema WorkflowSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'WorkflowSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_WorkflowSpecPublishConnectionDetailsToConfigRefPolicy(obj: WorkflowSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema WorkflowSpecForProviderServiceAccountRefPolicyResolution
 */
export enum WorkflowSpecForProviderServiceAccountRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema WorkflowSpecForProviderServiceAccountRefPolicyResolve
 */
export enum WorkflowSpecForProviderServiceAccountRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema WorkflowSpecForProviderServiceAccountSelectorPolicyResolution
 */
export enum WorkflowSpecForProviderServiceAccountSelectorPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema WorkflowSpecForProviderServiceAccountSelectorPolicyResolve
 */
export enum WorkflowSpecForProviderServiceAccountSelectorPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum WorkflowSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}
