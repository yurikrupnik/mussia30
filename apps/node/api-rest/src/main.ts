import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from '@mussia30/node/nest/filters';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@mussia30/node/nest/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'apis';
  // start custom config here
  app.enableCors();

  // app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();

  // end custom config here

  const logger = app.get(Logger);
  const docs = app.get(SwaggerModule);
  docs.setup(app, globalPrefix, 'Rest API', 'General use api');

  const port = configService.get('PORT') || 8080;
  await app.listen(port, () => {
    logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
