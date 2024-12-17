import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// apabila ingine menggunakan prisma service, hanya perlu import prisma modulenya saja
@Module({
  providers: [PrismaService],
  // agar prisma service bisa digunakan diluar dari prisma module
  exports: [PrismaService],
})
export class PrismaModule {}
