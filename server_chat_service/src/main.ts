import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { configureCors } from '../security/cors/cors';
import { setupGlobalPipes } from '../pipes/global-pipes';
import { setupGraphqlUpload } from '../media/upload/graphql-upload-express';
import { MyLogger } from '../utils/logger/logger';
import * as compression from 'compression';
import { setupSecurity } from '../security/helmet/helmet';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import {
  logApplicationDetails,
  logServerListening,
  logServerReady,
} from '../logs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  //This will log the application details
  const configService = app.get(ConfigService);
  logApplicationDetails(configService);

  // This is the cors setup
  //CORS is used to allow the server to accept requests from different origins
  configureCors(app);

  // This is the security setup - helmet
  setupSecurity(app);

  //This is used to parse the incoming request data with JSON payloads
  app.use(express.json({ limit: '50mb' }));

  // This is the cookie parser setup
  //Cookie parser used for cookies in the app - This will parse cookies in the app
  app.use(cookieParser());

  // Compression is used to compress the response body
  app.use(compression());

  // This is the global pipe setup
  //Pipes are used to validate the incoming request data
  setupGlobalPipes(app);

  // This is the graphql upload setup
  setupGraphqlUpload(app);

  //This is the app listen setup
  const port = configService.get('port');
  await app.listen(port);

  if (process.env.NODE_ENV === 'production') {
    logServerReady(port);
  } else {
    logServerListening(port);
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
