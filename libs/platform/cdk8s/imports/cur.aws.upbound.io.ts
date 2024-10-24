// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * ReportDefinition is the Schema for the ReportDefinitions API. Provides a Cost and Usage Report Definition.
 *
 * @schema ReportDefinition
 */
export class ReportDefinition extends ApiObject {
  /**
   * Returns the apiVersion and kind for "ReportDefinition"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'cur.aws.upbound.io/v1beta1',
    kind: 'ReportDefinition',
  }

  /**
   * Renders a Kubernetes manifest for "ReportDefinition".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ReportDefinitionProps): any {
    return {
      ...ReportDefinition.GVK,
      ...toJson_ReportDefinitionProps(props),
    };
  }

  /**
   * Defines a "ReportDefinition" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ReportDefinitionProps) {
    super(scope, id, {
      ...ReportDefinition.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...ReportDefinition.GVK,
      ...toJson_ReportDefinitionProps(resolved),
    };
  }
}

/**
 * ReportDefinition is the Schema for the ReportDefinitions API. Provides a Cost and Usage Report Definition.
 *
 * @schema ReportDefinition
 */
export interface ReportDefinitionProps {
  /**
   * @schema ReportDefinition#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * ReportDefinitionSpec defines the desired state of ReportDefinition
   *
   * @schema ReportDefinition#spec
   */
  readonly spec: ReportDefinitionSpec;

}

/**
 * Converts an object of type 'ReportDefinitionProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionProps(obj: ReportDefinitionProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_ReportDefinitionSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ReportDefinitionSpec defines the desired state of ReportDefinition
 *
 * @schema ReportDefinitionSpec
 */
export interface ReportDefinitionSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
   *
   * @schema ReportDefinitionSpec#deletionPolicy
   */
  readonly deletionPolicy?: ReportDefinitionSpecDeletionPolicy;

  /**
   * @schema ReportDefinitionSpec#forProvider
   */
  readonly forProvider: ReportDefinitionSpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema ReportDefinitionSpec#providerConfigRef
   */
  readonly providerConfigRef?: ReportDefinitionSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema ReportDefinitionSpec#providerRef
   */
  readonly providerRef?: ReportDefinitionSpecProviderRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema ReportDefinitionSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: ReportDefinitionSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema ReportDefinitionSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: ReportDefinitionSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'ReportDefinitionSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpec(obj: ReportDefinitionSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_ReportDefinitionSpecForProvider(obj.forProvider),
    'providerConfigRef': toJson_ReportDefinitionSpecProviderConfigRef(obj.providerConfigRef),
    'providerRef': toJson_ReportDefinitionSpecProviderRef(obj.providerRef),
    'publishConnectionDetailsTo': toJson_ReportDefinitionSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_ReportDefinitionSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource.
 *
 * @schema ReportDefinitionSpecDeletionPolicy
 */
export enum ReportDefinitionSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema ReportDefinitionSpecForProvider
 */
export interface ReportDefinitionSpecForProvider {
  /**
   * A list of additional artifacts. Valid values are: REDSHIFT, QUICKSIGHT, ATHENA. When ATHENA exists within additional_artifacts, no other artifact type can be declared and report_versioning must be OVERWRITE_REPORT.
   *
   * @schema ReportDefinitionSpecForProvider#additionalArtifacts
   */
  readonly additionalArtifacts?: string[];

  /**
   * A list of schema elements. Valid values are: RESOURCES.
   *
   * @schema ReportDefinitionSpecForProvider#additionalSchemaElements
   */
  readonly additionalSchemaElements: string[];

  /**
   * Compression format for report. Valid values are: GZIP, ZIP, Parquet. If Parquet is used, then format must also be Parquet.
   *
   * @schema ReportDefinitionSpecForProvider#compression
   */
  readonly compression: string;

  /**
   * Format for report. Valid values are: textORcsv, Parquet. If Parquet is used, then Compression must also be Parquet.
   *
   * @schema ReportDefinitionSpecForProvider#format
   */
  readonly format: string;

  /**
   * Set to true to update your reports after they have been finalized if AWS detects charges related to previous months.
   *
   * @schema ReportDefinitionSpecForProvider#refreshClosedReports
   */
  readonly refreshClosedReports?: boolean;

  /**
   * Region is the region you'd like your resource to be created in.
   *
   * @schema ReportDefinitionSpecForProvider#region
   */
  readonly region: string;

  /**
   * Overwrite the previous version of each report or to deliver the report in addition to the previous versions. Valid values are: CREATE_NEW_REPORT and OVERWRITE_REPORT.
   *
   * @schema ReportDefinitionSpecForProvider#reportVersioning
   */
  readonly reportVersioning?: string;

  /**
   * Name of the existing S3 bucket to hold generated reports.
   *
   * @schema ReportDefinitionSpecForProvider#s3Bucket
   */
  readonly s3Bucket?: string;

  /**
   * Reference to a Bucket in s3 to populate s3Bucket.
   *
   * @schema ReportDefinitionSpecForProvider#s3BucketRef
   */
  readonly s3BucketRef?: ReportDefinitionSpecForProviderS3BucketRef;

  /**
   * Selector for a Bucket in s3 to populate s3Bucket.
   *
   * @schema ReportDefinitionSpecForProvider#s3BucketSelector
   */
  readonly s3BucketSelector?: ReportDefinitionSpecForProviderS3BucketSelector;

  /**
   * Report path prefix. Limited to 256 characters.
   *
   * @schema ReportDefinitionSpecForProvider#s3Prefix
   */
  readonly s3Prefix?: string;

  /**
   * Region of the existing S3 bucket to hold generated reports.
   *
   * @schema ReportDefinitionSpecForProvider#s3Region
   */
  readonly s3Region: string;

  /**
   * The frequency on which report data are measured and displayed.  Valid values are: DAILY, HOURLY, MONTHLY.
   *
   * @schema ReportDefinitionSpecForProvider#timeUnit
   */
  readonly timeUnit: string;

}

/**
 * Converts an object of type 'ReportDefinitionSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecForProvider(obj: ReportDefinitionSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'additionalArtifacts': obj.additionalArtifacts?.map(y => y),
    'additionalSchemaElements': obj.additionalSchemaElements?.map(y => y),
    'compression': obj.compression,
    'format': obj.format,
    'refreshClosedReports': obj.refreshClosedReports,
    'region': obj.region,
    'reportVersioning': obj.reportVersioning,
    's3Bucket': obj.s3Bucket,
    's3BucketRef': toJson_ReportDefinitionSpecForProviderS3BucketRef(obj.s3BucketRef),
    's3BucketSelector': toJson_ReportDefinitionSpecForProviderS3BucketSelector(obj.s3BucketSelector),
    's3Prefix': obj.s3Prefix,
    's3Region': obj.s3Region,
    'timeUnit': obj.timeUnit,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema ReportDefinitionSpecProviderConfigRef
 */
export interface ReportDefinitionSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ReportDefinitionSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ReportDefinitionSpecProviderConfigRef#policy
   */
  readonly policy?: ReportDefinitionSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'ReportDefinitionSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecProviderConfigRef(obj: ReportDefinitionSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ReportDefinitionSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema ReportDefinitionSpecProviderRef
 */
export interface ReportDefinitionSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema ReportDefinitionSpecProviderRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ReportDefinitionSpecProviderRef#policy
   */
  readonly policy?: ReportDefinitionSpecProviderRefPolicy;

}

/**
 * Converts an object of type 'ReportDefinitionSpecProviderRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecProviderRef(obj: ReportDefinitionSpecProviderRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ReportDefinitionSpecProviderRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema ReportDefinitionSpecPublishConnectionDetailsTo
 */
export interface ReportDefinitionSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: ReportDefinitionSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: ReportDefinitionSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'ReportDefinitionSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecPublishConnectionDetailsTo(obj: ReportDefinitionSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_ReportDefinitionSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_ReportDefinitionSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema ReportDefinitionSpecWriteConnectionSecretToRef
 */
export interface ReportDefinitionSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema ReportDefinitionSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema ReportDefinitionSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'ReportDefinitionSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecWriteConnectionSecretToRef(obj: ReportDefinitionSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * Reference to a Bucket in s3 to populate s3Bucket.
 *
 * @schema ReportDefinitionSpecForProviderS3BucketRef
 */
export interface ReportDefinitionSpecForProviderS3BucketRef {
  /**
   * Name of the referenced object.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketRef#policy
   */
  readonly policy?: ReportDefinitionSpecForProviderS3BucketRefPolicy;

}

/**
 * Converts an object of type 'ReportDefinitionSpecForProviderS3BucketRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecForProviderS3BucketRef(obj: ReportDefinitionSpecForProviderS3BucketRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ReportDefinitionSpecForProviderS3BucketRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Selector for a Bucket in s3 to populate s3Bucket.
 *
 * @schema ReportDefinitionSpecForProviderS3BucketSelector
 */
export interface ReportDefinitionSpecForProviderS3BucketSelector {
  /**
   * MatchControllerRef ensures an object with the same controller reference as the selecting object is selected.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketSelector#matchControllerRef
   */
  readonly matchControllerRef?: boolean;

  /**
   * MatchLabels ensures an object with matching labels is selected.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

  /**
   * Policies for selection.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketSelector#policy
   */
  readonly policy?: ReportDefinitionSpecForProviderS3BucketSelectorPolicy;

}

/**
 * Converts an object of type 'ReportDefinitionSpecForProviderS3BucketSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecForProviderS3BucketSelector(obj: ReportDefinitionSpecForProviderS3BucketSelector | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'matchControllerRef': obj.matchControllerRef,
    'matchLabels': ((obj.matchLabels) === undefined) ? undefined : (Object.entries(obj.matchLabels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'policy': toJson_ReportDefinitionSpecForProviderS3BucketSelectorPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema ReportDefinitionSpecProviderConfigRefPolicy
 */
export interface ReportDefinitionSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ReportDefinitionSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: ReportDefinitionSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ReportDefinitionSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: ReportDefinitionSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ReportDefinitionSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecProviderConfigRefPolicy(obj: ReportDefinitionSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecProviderRefPolicy
 */
export interface ReportDefinitionSpecProviderRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ReportDefinitionSpecProviderRefPolicy#resolution
   */
  readonly resolution?: ReportDefinitionSpecProviderRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ReportDefinitionSpecProviderRefPolicy#resolve
   */
  readonly resolve?: ReportDefinitionSpecProviderRefPolicyResolve;

}

/**
 * Converts an object of type 'ReportDefinitionSpecProviderRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecProviderRefPolicy(obj: ReportDefinitionSpecProviderRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRef
 */
export interface ReportDefinitionSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'ReportDefinitionSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecPublishConnectionDetailsToConfigRef(obj: ReportDefinitionSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema ReportDefinitionSpecPublishConnectionDetailsToMetadata
 */
export interface ReportDefinitionSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'ReportDefinitionSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecPublishConnectionDetailsToMetadata(obj: ReportDefinitionSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecForProviderS3BucketRefPolicy
 */
export interface ReportDefinitionSpecForProviderS3BucketRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketRefPolicy#resolution
   */
  readonly resolution?: ReportDefinitionSpecForProviderS3BucketRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketRefPolicy#resolve
   */
  readonly resolve?: ReportDefinitionSpecForProviderS3BucketRefPolicyResolve;

}

/**
 * Converts an object of type 'ReportDefinitionSpecForProviderS3BucketRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecForProviderS3BucketRefPolicy(obj: ReportDefinitionSpecForProviderS3BucketRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecForProviderS3BucketSelectorPolicy
 */
export interface ReportDefinitionSpecForProviderS3BucketSelectorPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketSelectorPolicy#resolution
   */
  readonly resolution?: ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ReportDefinitionSpecForProviderS3BucketSelectorPolicy#resolve
   */
  readonly resolve?: ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolve;

}

/**
 * Converts an object of type 'ReportDefinitionSpecForProviderS3BucketSelectorPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecForProviderS3BucketSelectorPolicy(obj: ReportDefinitionSpecForProviderS3BucketSelectorPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecProviderConfigRefPolicyResolution
 */
export enum ReportDefinitionSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ReportDefinitionSpecProviderConfigRefPolicyResolve
 */
export enum ReportDefinitionSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema ReportDefinitionSpecProviderRefPolicyResolution
 */
export enum ReportDefinitionSpecProviderRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ReportDefinitionSpecProviderRefPolicyResolve
 */
export enum ReportDefinitionSpecProviderRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy(obj: ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ReportDefinitionSpecForProviderS3BucketRefPolicyResolution
 */
export enum ReportDefinitionSpecForProviderS3BucketRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ReportDefinitionSpecForProviderS3BucketRefPolicyResolve
 */
export enum ReportDefinitionSpecForProviderS3BucketRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolution
 */
export enum ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolve
 */
export enum ReportDefinitionSpecForProviderS3BucketSelectorPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum ReportDefinitionSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

