import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@mussia30/node/nest/users-api';
//import { BackendProductsApiModule } from '@mussia14/backend/products-api';
import { SwaggerModule } from '@mussia30/node/nest/swagger';
import { HealthModule } from '@mussia30/node/nest/health';
import { LoggerModule } from '@mussia30/node/nest/logger';
//import { AuthModule } from '@mussia14/backend/auth';
// import { TcpUserController } from './tcp/tcp-users.controller';
// import { PostsController } from './posts/posts.controller';
// import { RedisUserController } from './redis-user/redis-user.controller';
import { GrpcController } from './app.controller'; // grpc controller

// import { PubSubModule } from './pubsub/pubsub.module';
//import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
    }),
    //    AuthModule,
    HealthModule,
    //    FriendsModule,
    SwaggerModule,
    LoggerModule,
    //    BackendProductsApiModule,
    UsersModule,
    // PubSubModule,
  ],
  controllers: [
    // PostsController,
    // RedisUserController,
    // TcpUserController,
    GrpcController,
  ],
})
export class AppModule {}
