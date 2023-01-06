import { Controller, Get, Post, Body, Req } from '@nestjs/common';
// import { CreateRedisUserDto } from './dto/create-redis-user.dto';
import { Client, ClientRedis, Transport } from '@nestjs/microservices';
import {
  ControllerDecorators,
  SwaggerPostDecorators,
} from '@mussia30/node/nest/swagger';
import { User } from '@mussia30/node/nest/users-api';

// @Controller('redis-users')
@ControllerDecorators('redis-users')
export class RedisUserController {
  @Client({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  })
  client: ClientRedis;

  @SwaggerPostDecorators(User)
  create(@Body() createRedisUserDto: any) {
    return this.client.send('add.new', createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    console.log('get', request.url);
    console.log('get', request.query);
    console.log('get', request.params);
    return this.client.send('get.list', request.query);
  }
}
