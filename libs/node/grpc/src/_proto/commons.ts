/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "commons";

export interface Id {
  id: string;
}

export interface Name {
  name: string;
}

export interface Query {
  attributes: string[];
  where: string;
  order: string;
  offset: number;
  limit: number;
}

export interface Count {
  count: number;
}

function createBaseId(): Id {
  return { id: "" };
}

export const Id = {
  encode(message: Id, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Id {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Id {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: Id): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Id>, I>>(object: I): Id {
    const message = createBaseId();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseName(): Name {
  return { name: "" };
}

export const Name = {
  encode(message: Name, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Name {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Name {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Name): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Name>, I>>(object: I): Name {
    const message = createBaseName();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseQuery(): Query {
  return { attributes: [], where: "", order: "", offset: 0, limit: 0 };
}

export const Query = {
  encode(message: Query, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.attributes) {
      writer.uint32(10).string(v!);
    }
    if (message.where !== "") {
      writer.uint32(18).string(message.where);
    }
    if (message.order !== "") {
      writer.uint32(26).string(message.order);
    }
    if (message.offset !== 0) {
      writer.uint32(32).int32(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(40).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Query {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attributes.push(reader.string());
          break;
        case 2:
          message.where = reader.string();
          break;
        case 3:
          message.order = reader.string();
          break;
        case 4:
          message.offset = reader.int32();
          break;
        case 5:
          message.limit = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Query {
    return {
      attributes: Array.isArray(object?.attributes) ? object.attributes.map((e: any) => String(e)) : [],
      where: isSet(object.where) ? String(object.where) : "",
      order: isSet(object.order) ? String(object.order) : "",
      offset: isSet(object.offset) ? Number(object.offset) : 0,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
    };
  },

  toJSON(message: Query): unknown {
    const obj: any = {};
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) => e);
    } else {
      obj.attributes = [];
    }
    message.where !== undefined && (obj.where = message.where);
    message.order !== undefined && (obj.order = message.order);
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Query>, I>>(object: I): Query {
    const message = createBaseQuery();
    message.attributes = object.attributes?.map((e) => e) || [];
    message.where = object.where ?? "";
    message.order = object.order ?? "";
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseCount(): Count {
  return { count: 0 };
}

export const Count = {
  encode(message: Count, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.count !== 0) {
      writer.uint32(8).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Count {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Count {
    return { count: isSet(object.count) ? Number(object.count) : 0 };
  },

  toJSON(message: Count): unknown {
    const obj: any = {};
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Count>, I>>(object: I): Count {
    const message = createBaseCount();
    message.count = object.count ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
