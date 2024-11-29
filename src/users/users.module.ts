import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UsersService } from './user/user.service';

@Module({
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
