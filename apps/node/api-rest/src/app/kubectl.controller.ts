import { Body, Delete, Param, Query, Req, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { OmitType, PartialType } from '@nestjs/swagger';
import {
  SwaggerDeleteByIdDecorators,
  SwaggerGetByIdDecorators,
  SwaggerPostDecorators,
  SwaggerPutDecorators,
  ControllerDecorators,
  SwaggerGetDecorators,
} from '@mussia30/node/nest/swagger';
// import {
//   applyDecorators,
//   Controller,
//   Delete,
//   Get,
//   Post,
//   Put,
// } from '@nestjs/common';

// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

enum Projection {
  name = 'name',
  role = 'role',
  email = 'email',
  tenantId = 'tenantId',
  provider = 'provider',
}

@ControllerDecorators('kubectl')
export class KubectlController {
  // constructor() {}
  @Post()
  post() {
    return 'aris';
    // return this.usersService.create(createItemDto);
  }
  @Get()
  getData(
    @Req() request: Request,
    @Query('projection') projection: Projection | [Projection] | null,
    @Query('limit') limit = 0
    // @Query('search') search: Partial<Omit<User, '_id' | 'password'>>
  ) {
    // return 'ad';
    const namespace = {
      metadata: {
        name: 'test',
      },
    };
    return k8sApi.createNamespace(namespace).then(
      (response) => {
        console.log('Created namespace', response);
        //     // console.log(response);
        //     // k8sApi.readNamespace(namespace.metadata.name).then((response) => {
        //     //   console.log(response);
        //     //   // k8sApi.deleteNamespace(
        //     //   //   namespace.metadata.name,
        //     //   //   {} /* delete options */
        //     //   // );
        //     // });
        return 'data';
      },
      (err) => {
        console.log('Error!: ' + err);
      }
    );
  }
}
