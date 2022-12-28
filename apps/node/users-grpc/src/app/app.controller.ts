import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { ServerUnaryCall, Metadata } from '@grpc/grpc-js';
import { AppService } from './app.service';
import { User } from '@mussia30/node/nest/users-api';

interface GetItemRequestDto {
  id: string;
  projection: Array<string>;
}

interface GetItemsRequestDto {
  limit: number;
  projection: Array<string>;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'GetUsers')
  // @GrpcStreamMethod('AppController')
  getData(
    body: GetItemsRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    console.log({ body });
    console.log({ metadata });
    console.log({ call });
    return this.appService
      .findAll({}, body.projection, { limit: body.limit })
      .then((res) => {
        return { data: res };
      });
  }
  // @GrpcMethod('AppController', 'GetUser')
  @GrpcStreamMethod('AppController')
  getUser(body: GetItemRequestDto, metadata: Metadata) {
    console.log({ metadata });
    return this.appService.findById(body.id, body.projection);
  }

  // done
  @GrpcMethod('AppController', 'CreateUser')
  create(data: Partial<User>) {
    console.log('data', data);
    return this.appService.create(data);
  }

  // done
  @GrpcMethod('AppController', 'DeleteUser')
  delete(body: Omit<GetItemRequestDto, 'projection'>) {
    return this.appService.delete(body.id);
  }
}
