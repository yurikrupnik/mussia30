/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export interface Request {
  a: number;
  b: number;
}

export interface Response {
  result: number;
}

function createBaseRequest(): Request {
  return { a: 0, b: 0 };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.a !== 0) {
      writer.uint32(8).int64(message.a);
    }
    if (message.b !== 0) {
      writer.uint32(16).int64(message.b);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.b = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    return { a: isSet(object.a) ? Number(object.a) : 0, b: isSet(object.b) ? Number(object.b) : 0 };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = Math.round(message.a));
    message.b !== undefined && (obj.b = Math.round(message.b));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.a = object.a ?? 0;
    message.b = object.b ?? 0;
    return message;
  },
};

function createBaseResponse(): Response {
  return { result: 0 };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int64(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return { result: isSet(object.result) ? Number(object.result) : 0 };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = Math.round(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

export interface AddService {
  Add(request: Request): Promise<Response>;
  Multiply(request: Request): Promise<Response>;
}

export class AddServiceClientImpl implements AddService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "proto.AddService";
    this.rpc = rpc;
    this.Add = this.Add.bind(this);
    this.Multiply = this.Multiply.bind(this);
  }
  Add(request: Request): Promise<Response> {
    const data = Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "Add", data);
    return promise.then((data) => Response.decode(new _m0.Reader(data)));
  }

  Multiply(request: Request): Promise<Response> {
    const data = Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "Multiply", data);
    return promise.then((data) => Response.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
