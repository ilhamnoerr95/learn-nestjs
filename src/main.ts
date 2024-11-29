import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // untuk setup cookie parser
  app.use(cookieParser('rahasia ilahi'));
  await app.listen(3333);
}
bootstrap();
