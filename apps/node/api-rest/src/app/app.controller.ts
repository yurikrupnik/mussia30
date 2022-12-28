import { Body, Controller, Param, Query } from '@nestjs/common';
// import { RedisUserService } from './redis-user.service';
// import { CreateRedisUserDto } from './dto/create-redis-user.dto';
// import { UpdateRedisUserDto } from './dto/update-redis-user.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable, map, first } from 'rxjs';
import { join } from 'path';
import { User } from '@mussia30/node/nest/users-api';
import {
  SwaggerGetByIdDecorators,
  SwaggerPostDecorators,
  SwaggerDeleteByIdDecorators,
  SwaggerGetDecorators,
} from '@mussia30/node/nest/swagger';
import { OmitType, PartialType } from '@nestjs/swagger';
import { GrpcStreamCall } from '@nestjs/microservices';

interface GetDto {
  data: User[];
}

export interface IGrpcService {
  getUsers(query: GetItemsRequestDto): Observable<GetDto>;
  GetUsersStream(query: GetItemsRequestDto): Observable<GetDto>;
  createUser(body: Partial<User>): Observable<User>;
  getUser(body: GetItemRequestDto): Observable<User>;
  deleteUser(body: Omit<GetItemRequestDto, 'projection'>): Observable<User>;
}

interface GetItemsRequestDto {
  limit: number;
  projection: Array<string> | null;
}

interface GetItemRequestDto {
  id: string;
  projection: Array<string> | null;
}

enum Projection {
  name = 'name',
  role = 'role',
  email = 'email',
  tenantId = 'tenantId',
  provider = 'provider',
}

export class CreateUserDto extends OmitType(User, ['_id'] as const) {}

@Controller('grpc-user')
export class GrpcController {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'app',
      protoPath: join(process.cwd(), '_proto/users.proto'),
    },
  })
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController');
  }

  // Done
  @SwaggerGetDecorators<User>(
    Projection,
    User,
    PartialType(OmitType(User, ['_id', 'password']))
  )

  // Todo fix stream via grpc
  // @GrpcStreamCall('AppController')
  // lotsOfGreetings(
  //   requestStream: any,
  //   callback: (err: unknown, value: { reply: string }) => void
  // ) {
  //   requestStream.on('data', (message) => {
  //     console.log(message);
  //   });
  //   requestStream.on('end', () => callback(null, { reply: 'Hello, world!' }));
  // }
  findAll(
    @Query('projection') projection: Projection | [Projection] | null,
    @Query('limit') limit = 0
  ) {
    const payload = {
      limit,
      projection:
        typeof projection === 'string' ? projection.split(',') : projection,
    };
    console.log({ payload });
    // return this.grpcService.GetUsersStream(payload).
    return this.grpcService.getUsers(payload).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  // Done
  @SwaggerPostDecorators(User)
  create(@Body() body: CreateUserDto) {
    return this.grpcService.createUser(body);
  }

  // Done
  @SwaggerGetByIdDecorators(Projection, User)
  getUser(
    @Param('id') id: string,
    @Query('projection') projection: Projection | [Projection] | null
  ) {
    const payload = {
      id,
      projection:
        typeof projection === 'string' ? projection.split(',') : projection,
    };
    return this.grpcService.getUser(payload);
  }

  // Done
  @SwaggerDeleteByIdDecorators()
  deleteUser(@Param('id') id: string) {
    const payload = {
      id,
    };
    return this.grpcService.deleteUser(payload);
  }
}
