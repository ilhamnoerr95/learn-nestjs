import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepoService {
  constructor(private prismaService: PrismaService) {
    console.info('create user repository');
  }

  async save(name: string, email: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        name,
        email,
      },
    });
  }
}
