/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

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
  Id?: string | undefined;
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

export const APP_PACKAGE_NAME = "app";

/** Declare a service for each controller you have */

export interface AppControllerClient {
  /** Declare an rpc for each method that is called via gRPC */

  createUser(request: User, metadata: Metadata, ...rest: any): Observable<User>;

  getUser(request: getUserRequestDto, metadata: Metadata, ...rest: any): Observable<User>;

  deleteUser(request: deleteUserRequestDto, metadata: Metadata, ...rest: any): Observable<VoidResponse>;

  updateUser(request: updateUserRequestDto, metadata: Metadata, ...rest: any): Observable<User>;

  getUsers(request: getUsersRequestDto, metadata: Metadata, ...rest: any): Observable<Users>;

  getUsersStream(request: getUsersRequestDto, metadata: Metadata, ...rest: any): Observable<User>;
}

/** Declare a service for each controller you have */

export interface AppControllerController {
  /** Declare an rpc for each method that is called via gRPC */

  createUser(request: User, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  getUser(request: getUserRequestDto, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  deleteUser(
    request: deleteUserRequestDto,
    metadata: Metadata,
    ...rest: any
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;

  updateUser(request: updateUserRequestDto, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  getUsers(request: getUsersRequestDto, metadata: Metadata, ...rest: any): Promise<Users> | Observable<Users> | Users;

  getUsersStream(request: getUsersRequestDto, metadata: Metadata, ...rest: any): Observable<User>;
}

export function AppControllerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUser", "deleteUser", "updateUser", "getUsers", "getUsersStream"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APP_CONTROLLER_SERVICE_NAME = "AppController";
