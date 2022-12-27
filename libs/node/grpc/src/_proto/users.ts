/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "app";

export interface getUsersRequestDto {
  limit: string;
  projection: string[];
}

export interface updateUserRequestDto {
  id: string;
}

export interface VoidResponse {
}

export interface deleteUserRequestDto {
  id: string;
}

export interface getUserRequestDto {
  id: string;
  projection: string[];
}

export interface User {
  Id: string;
  name: string;
  email: string;
  tenantId: string;
  role: string;
  provider: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

export interface Users {
  data: User[];
}

function createBasegetUsersRequestDto(): getUsersRequestDto {
  return { limit: "", projection: [] };
}

export const getUsersRequestDto = {
  encode(message: getUsersRequestDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== "") {
      writer.uint32(10).string(message.limit);
    }
    for (const v of message.projection) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): getUsersRequestDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasegetUsersRequestDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.string();
          break;
        case 2:
          message.projection.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): getUsersRequestDto {
    return {
      limit: isSet(object.limit) ? String(object.limit) : "",
      projection: Array.isArray(object?.projection) ? object.projection.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: getUsersRequestDto): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    if (message.projection) {
      obj.projection = message.projection.map((e) => e);
    } else {
      obj.projection = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<getUsersRequestDto>, I>>(object: I): getUsersRequestDto {
    const message = createBasegetUsersRequestDto();
    message.limit = object.limit ?? "";
    message.projection = object.projection?.map((e) => e) || [];
    return message;
  },
};

function createBaseupdateUserRequestDto(): updateUserRequestDto {
  return { id: "" };
}

export const updateUserRequestDto = {
  encode(message: updateUserRequestDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): updateUserRequestDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseupdateUserRequestDto();
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

  fromJSON(object: any): updateUserRequestDto {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: updateUserRequestDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<updateUserRequestDto>, I>>(object: I): updateUserRequestDto {
    const message = createBaseupdateUserRequestDto();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseVoidResponse(): VoidResponse {
  return {};
}

export const VoidResponse = {
  encode(_: VoidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): VoidResponse {
    return {};
  },

  toJSON(_: VoidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VoidResponse>, I>>(_: I): VoidResponse {
    const message = createBaseVoidResponse();
    return message;
  },
};

function createBasedeleteUserRequestDto(): deleteUserRequestDto {
  return { id: "" };
}

export const deleteUserRequestDto = {
  encode(message: deleteUserRequestDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): deleteUserRequestDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasedeleteUserRequestDto();
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

  fromJSON(object: any): deleteUserRequestDto {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: deleteUserRequestDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<deleteUserRequestDto>, I>>(object: I): deleteUserRequestDto {
    const message = createBasedeleteUserRequestDto();
    message.id = object.id ?? "";
    return message;
  },
};

function createBasegetUserRequestDto(): getUserRequestDto {
  return { id: "", projection: [] };
}

export const getUserRequestDto = {
  encode(message: getUserRequestDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.projection) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): getUserRequestDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasegetUserRequestDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.projection.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): getUserRequestDto {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      projection: Array.isArray(object?.projection) ? object.projection.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: getUserRequestDto): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.projection) {
      obj.projection = message.projection.map((e) => e);
    } else {
      obj.projection = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<getUserRequestDto>, I>>(object: I): getUserRequestDto {
    const message = createBasegetUserRequestDto();
    message.id = object.id ?? "";
    message.projection = object.projection?.map((e) => e) || [];
    return message;
  },
};

function createBaseUser(): User {
  return {
    Id: "",
    name: "",
    email: "",
    tenantId: "",
    role: "",
    provider: "",
    password: "",
    updatedAt: "",
    createdAt: "",
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Id !== "") {
      writer.uint32(10).string(message.Id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.tenantId !== "") {
      writer.uint32(34).string(message.tenantId);
    }
    if (message.role !== "") {
      writer.uint32(42).string(message.role);
    }
    if (message.provider !== "") {
      writer.uint32(50).string(message.provider);
    }
    if (message.password !== "") {
      writer.uint32(58).string(message.password);
    }
    if (message.updatedAt !== "") {
      writer.uint32(66).string(message.updatedAt);
    }
    if (message.createdAt !== "") {
      writer.uint32(74).string(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.tenantId = reader.string();
          break;
        case 5:
          message.role = reader.string();
          break;
        case 6:
          message.provider = reader.string();
          break;
        case 7:
          message.password = reader.string();
          break;
        case 8:
          message.updatedAt = reader.string();
          break;
        case 9:
          message.createdAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      Id: isSet(object.Id) ? String(object.Id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      email: isSet(object.email) ? String(object.email) : "",
      tenantId: isSet(object.tenantId) ? String(object.tenantId) : "",
      role: isSet(object.role) ? String(object.role) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      password: isSet(object.password) ? String(object.password) : "",
      updatedAt: isSet(object.updatedAt) ? String(object.updatedAt) : "",
      createdAt: isSet(object.createdAt) ? String(object.createdAt) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.Id !== undefined && (obj.Id = message.Id);
    message.name !== undefined && (obj.name = message.name);
    message.email !== undefined && (obj.email = message.email);
    message.tenantId !== undefined && (obj.tenantId = message.tenantId);
    message.role !== undefined && (obj.role = message.role);
    message.provider !== undefined && (obj.provider = message.provider);
    message.password !== undefined && (obj.password = message.password);
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.Id = object.Id ?? "";
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    message.tenantId = object.tenantId ?? "";
    message.role = object.role ?? "";
    message.provider = object.provider ?? "";
    message.password = object.password ?? "";
    message.updatedAt = object.updatedAt ?? "";
    message.createdAt = object.createdAt ?? "";
    return message;
  },
};

function createBaseUsers(): Users {
  return { data: [] };
}

export const Users = {
  encode(message: Users, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Users {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(User.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Users {
    return { data: Array.isArray(object?.data) ? object.data.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Users>, I>>(object: I): Users {
    const message = createBaseUsers();
    message.data = object.data?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

/** Declare a service for each controller you have */
export interface AppController {
  /** Declare an rpc for each method that is called via gRPC */
  CreateUser(request: User): Promise<User>;
  GetUser(request: getUserRequestDto): Promise<User>;
  DeleteUser(request: deleteUserRequestDto): Promise<VoidResponse>;
  updateUser(request: updateUserRequestDto): Promise<User>;
  GetUsers(request: getUsersRequestDto): Promise<Users>;
  GetUsersStream(request: getUsersRequestDto): Observable<User>;
}

export class AppControllerClientImpl implements AppController {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "app.AppController";
    this.rpc = rpc;
    this.CreateUser = this.CreateUser.bind(this);
    this.GetUser = this.GetUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.GetUsers = this.GetUsers.bind(this);
    this.GetUsersStream = this.GetUsersStream.bind(this);
  }
  CreateUser(request: User): Promise<User> {
    const data = User.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateUser", data);
    return promise.then((data) => User.decode(new _m0.Reader(data)));
  }

  GetUser(request: getUserRequestDto): Promise<User> {
    const data = getUserRequestDto.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetUser", data);
    return promise.then((data) => User.decode(new _m0.Reader(data)));
  }

  DeleteUser(request: deleteUserRequestDto): Promise<VoidResponse> {
    const data = deleteUserRequestDto.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteUser", data);
    return promise.then((data) => VoidResponse.decode(new _m0.Reader(data)));
  }

  updateUser(request: updateUserRequestDto): Promise<User> {
    const data = updateUserRequestDto.encode(request).finish();
    const promise = this.rpc.request(this.service, "updateUser", data);
    return promise.then((data) => User.decode(new _m0.Reader(data)));
  }

  GetUsers(request: getUsersRequestDto): Promise<Users> {
    const data = getUsersRequestDto.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetUsers", data);
    return promise.then((data) => Users.decode(new _m0.Reader(data)));
  }

  GetUsersStream(request: getUsersRequestDto): Observable<User> {
    const data = getUsersRequestDto.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "GetUsersStream", data);
    return result.pipe(map((data) => User.decode(new _m0.Reader(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

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
