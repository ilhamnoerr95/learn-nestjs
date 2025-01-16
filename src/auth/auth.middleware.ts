import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaservice: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const username = Number(req.headers['x-username']); // convertion become string
    if (!username) throw new HttpException('Unauthorized', 401);

    const user = await this.prismaservice.user.findUnique({
      where: {
        id: username,
      },
    });
    if (user) {
      req.user = user;
      console.info(req);

      next();
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
