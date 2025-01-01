import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// untuk membuat prisma module jadi global
// tetap harus import module ke root utama
@Global()
// apabila ingine menggunakan prisma service, hanya perlu import prisma modulenya saja
@Module({
  providers: [PrismaService],
  // agar prisma service bisa digunakan diluar dari prisma module
  exports: [PrismaService],
})
export class PrismaModule {}
