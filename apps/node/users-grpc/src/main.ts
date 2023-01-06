import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { users } from '@mussia30/node/grpc';

const logger = new Logger('Main');

// const url = '0.0.0.0:8080';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: users.APP_PACKAGE_NAME,
    // protoPath: join(process.cwd(), '_proto/users.proto'),
    protoPath: join(__dirname, 'assets/users.proto'),
    // url: '0.0.0.0:8080',
    // url,
    // protoPath: join(__dirname, 'assets/users.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions
  );
  app.listen().then(() => {
    logger.log('Microservice is listening...');
  });
}
bootstrap();
