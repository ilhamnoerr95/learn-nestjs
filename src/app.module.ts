import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MemberService } from './users/member/member.service';
import { Mail, mailClass } from './users/mail/mail';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

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
export class AppModule {}
