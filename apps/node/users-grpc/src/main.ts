import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

const logger = new Logger('Main');

const s = join(process.cwd(), '_proto/users.proto');
console.log({ s });
const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: s,
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
