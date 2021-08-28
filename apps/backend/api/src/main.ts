/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());



  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization,Accept',
    credentials: true,
  });


  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });

}

bootstrap();
