import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
// import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  // main root untuk modulenya
  const app = await NestFactory.create(AppModule);

  // ini digunakan untuk global exeption error
  // perlu dicatat bahwa ketika validation error ini hanya specific
  // pada error tertentu maka error yg lain tidak akan terdeteksi
  // jadi butuh adjusment tambahan agar semua jenis error bisa dijadikan satu
  // dalam fungsi yang sama
  // app.useGlobalFilters(new ValidationFilter());

  // untuk setup cookie parser
  app.use(cookieParser('rahasia ilahi'));
  const PORT = app.get(ConfigService);
  await app.listen(PORT.get('PORT'));
}
bootstrap();
