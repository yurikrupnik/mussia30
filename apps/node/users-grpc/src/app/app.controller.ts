import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices'; // GrpcStreamMethod
import { ServerUnaryCall, Metadata } from '@grpc/grpc-js';
import { AppService } from './app.service';
// import { User } from '@mussia30/node/nest/users-api';
import { users } from '@mussia30/node/grpc';

users.AppControllerControllerMethods();
@Controller()
// export class AppController implements users.AppControllerController {
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'GetUsers')
  getData(
    body: users.GetUsersRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    // console.log({ body });
    // console.log({ metadata });
    // console.log({ call });
    return this.appService
      .findAll({}, body.projection, {
        limit: parseInt(body.limit, 10),
        projection: body.projection,
      })
      .then((res) => {
        return { data: res };
      });
  }

  @GrpcMethod('AppController', 'GetUser')
  getUser(body: users.GetUserRequestDto, metadata: Metadata) {
    // console.log({ metadata });
    return this.appService.findById(body.id, body.projection);
  }

  // done
  @GrpcMethod('AppController', 'CreateUser')
  create(data: Partial<users.User>) {
    console.log('data', data);
    return this.appService.create(data);
  }

  // done
  @GrpcMethod('AppController', 'DeleteUser')
  delete(body: Omit<users.GetUserRequestDto, 'projection'>) {
    return this.appService.delete(body.id);
  }
}
