import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UsersService } from './user/user.service';
import {
  Connection,
  //   mysqlConnection,
  //   mongoConnection,
  createConnection,
} from './user/connection';
import { mailClass, Mail } from './mail/mail';
import { ThirdParty, createThirParty } from './third-party/third-party';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { UserRepoService } from './user-repo/user-repo.service';
// import { PrismaModule } from 'src/prisma/prisma.module';tel

@Module({
  // imports: [PrismaModule],
  controllers: [UserController],
  //default providers sifatnya singleton,
  //   tapi bisa dibuat jadi optional/custom berdasrakan class mana
  // yg kita butuhkan
  providers: [
    // standard providers
    UsersService,
    // provider class untuk menentukan class mana yg akan digunakan
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
      //   class yg kita buat sendiri
      //   useClass:
      //     process.env.CONNECTION_DB === 'mysql'
      //       ? mysqlConnection
      //       : mongoConnection,
    },
    // value provider
    {
      provide: Mail,
      // gak perlu membuat/ memanggil injectable
      useValue: mailClass,
    },
    // factory provider
    {
      provide: ThirdParty,
      useFactory: createThirParty,
      inject: [Connection],
    },
    // alias provider
    // menggunakan dependency(provide) yg berbeda, untuk object yg sama
    // maksutnya menggunakan depency yg sudah ada tp nama providenya dibedakan
    {
      provide: 'aliasProvider',
      useExisting: Mail,
    },
    // service module reference
    MemberService,
    UserRepoService,
  ],
})
export class UsersModule {}
