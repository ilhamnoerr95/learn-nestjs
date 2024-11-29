import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

// module sebagai core dalam nestjs dalam pemanggilan setiap fungsi yg sudah dibuat
// dr berbagai module ataupun controller, service laiinya
// module yg kita buat di sini, merupakan module utama yang diimport oleh app.module.ts
// module yg kita buat di sini, merupakan module yang memiliki dependency ke module lain
// misalnya, UsersModule memiliki dependency ke Connection dan Mail, karena kedua-dua class tersebut dibutuhkan oleh UsersModule
// kita juga memberi tahu bahwa kita menggunakan provide yg sudah ada
@Module({
  // fungsi dari import untuk memanggil module lain
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
