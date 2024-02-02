import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { configureCors } from '../cors/cors';
import { setupGlobalPipes } from '../pipes/global-pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This is the cors setup
  //CORS is used to allow the server to accept requests from different origins
  configureCors(app);

  // This is the cookie parser setup
  //Cookie parser used for cookies in the app - This will parse cookies in the app
  app.use(cookieParser());

  // This is the global pipe setup
  //Pipes are used to validate the incoming request data
  setupGlobalPipes(app);
  await app.listen(3000);
}

bootstrap();
