import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  sayHello(name: string): string {
    return `halo nama aku ${name}`;
  }
}
