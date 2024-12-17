import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// extend ke prisma service
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // Memanggil constructor dari PrismaClient agar instance PrismaClient dapat diinisialisasi.
    // Ini memastikan PrismaService memiliki akses penuh ke semua fungsi bawaan PrismaClient.
    super();
    console.info('create prisma');
  }
}
