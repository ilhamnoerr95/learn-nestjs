import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MemberService } from './users/member/member.service';
import { Mail, mailClass } from './users/mail/mail';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

// module sebagai core dalam nestjs dalam pemanggilan setiap fungsi yg sudah dibuat
// dr berbagai module ataupun controller, service laiinya
// module yg kita buat di sini, merupakan module utama yang diimport oleh app.module.ts
// module yg kita buat di sini, merupakan module yang memiliki dependency ke module lain
// misalnya, UsersModule memiliki dependency ke Connection dan Mail, karena kedua-dua class tersebut dibutuhkan oleh UsersModule
// kita juga memberi tahu bahwa kita menggunakan provide yg sudah ada
@Module({
  // fungsi dari import untuk memanggil module lain
  imports: [
    // agar penggunaan env jauh lebih simple
    // bisa dipanggil per module
    ConfigModule.forRoot({
      // config service bisa di akses darimanapun
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    PrismaModule,
    ValidationModule.forRoot(true),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MemberService,
    {
      provide: Mail,
      // gak perlu membuat/ memanggil injectable
      useValue: mailClass,
    },
  ],
})

// overide app module dengan nestmodule
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //  bisa menggunakan lebih dari 1 middlewarea
    // for routes bisa digunakan untuk semua controller atau specific pathnya
    consumer.apply(LogMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/api/users/current',
      method: RequestMethod.GET,
    });
  }
}
