import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // untuk setup cookie parser
  app.use(cookieParser('rahasia ilahi'));
  const PORT = app.get(ConfigService);
  await app.listen(PORT.get('PORT'));
}
bootstrap();
