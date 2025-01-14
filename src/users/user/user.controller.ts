import {
  Controller,
  Get,
  Header,
  Req,
  Res,
  Query,
  Param,
  Redirect,
  HttpRedirectResponse,
  Inject,
  UseFilters,
  HttpException,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';

// service
import { UsersService } from './user.service';
import { Connection } from './connection';
import { Mail } from '../mail/mail';
import { ThirdParty } from '../third-party/third-party';
import { MemberService } from '../member/member.service';
import { UserRepoService } from '../user-repo/user-repo.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { LoginUserReq, loginUserReqValidation } from 'src/model/login.mode';
import { ValidationPipe } from 'src/validation/validation.pipe';

@Controller('/api/users')
export class UserController {
  constructor(
    private userService: UsersService,
    private connection: Connection,
    private mailService: Mail,
    // kita memberi tahu bahwa kita menggunakan provide yg sudah ada
    @Inject('aliasProvider') private mailAlias: Mail,
    private thirdParty: ThirdParty,
    private memberService: MemberService,
    private userRepo: UserRepoService,
  ) {}

  @Get('/connection')
  async connectionTes(): Promise<string> {
    this.thirdParty.save();
    this.mailService.sendMail('Not Alias success');
    this.mailAlias.sendMail('Alias');

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail('MOdule Service');

    return this.connection.getConnection();
  }

  @Get('/set-cookie')
  @Header('Set-Cookie', 'type=ninja')
  setCookie(@Query('name') name: string, @Res() res: Response) {
    // set up cookie dengan mengambil value query name
    // dan disimpan kedalam response.cookie
    res.cookie('name', name);
    res.status(200).send('Set cookie berhasil');
  }
  @Get('/get-cookie')
  getCookie(@Req() req: Request) {
    console.log(req);

    return req.cookies['name'];
  }

  @Get('/testQuery')
  testQuery(@Query('name') name: string): string {
    return `test query decorator dengan nama ${name}`;
  }

  @Get('/params/:id')
  testParam(@Param('id') id: string): string {
    return `test param decorator dengan id ${id}`;
  }

  // perlu diingat param yang dilempar pasti akan selalu tipe string
  // saat akan melakukan validasi maka lebih baiknya kita bisa konversi
  // sesuai apa yang diingkan menggunakan pipe yang disediakan nestjs
  @Get('/:id')
  testPipe(@Param('id', ParseIntPipe) id: number): string {
    console.log(typeof id);
    return `test param decorator dengan id ${id}`;
  }

  // @Get('/:id')
  // @Header('Content-Type', 'application/json')
  // getUserId(@Req() req: Request): string {
  //   const { params, query } = req;
  //   const statusCode = 200;

  //   const info = {
  //     self: 'NestJS Diagnostics Report',
  //     status: {
  //       statusCode,
  //       data: {
  //         id: params.id,
  //         query,
  //       },
  //     },
  //   };

  //   return JSON.stringify(info, null, 2);
  // }

  // secara default nest akan mengembalikan response json dr nestnya
  // jadi akan mengembalikkan decorator res
  @Get()
  @Header('Content-Type', 'application/json')
  getUsers(): {
    self: string;
    status: { statusCode: number; statusText: string };
  } {
    const statusCode = 200;
    const statusText = 'OK';

    const info = {
      self: 'NestJS Diagnostics Report',
      status: {
        statusCode,
        statusText,
      },
    };

    return info;
  }

  @Get('/redirect')
  @Redirect()
  testRedirect(): HttpRedirectResponse {
    return {
      statusCode: 301,
      url: '/',
    };
  }

  @Get('/test-async/uye')
  async testAsync(): Promise<{ data: string }> {
    return { data: 'oke' };
  }

  @Get('/say-hello')
  @UseFilters(ValidationFilter)
  testInject(@Query('name') name: string): string {
    return this.userService.sayHello(name);
  }

  @Get('/create')
  create(
    @Query('name') name: string,
    @Query('email') email: string,
  ): Promise<User> {
    if (!name) {
      throw new HttpException(
        {
          code: 400,
          message: 'Required name!',
        },
        400,
      );
    }
    return this.userRepo.save(name, email);
  }

  // usePipes levelan method
  @UsePipes(new ValidationPipe(loginUserReqValidation))
  @UseFilters(ValidationFilter)
  @Post('/login')
  async loginFunction(
    // params body bisa disesuaikan dngn body yg diinginkan,
    // memanggil clas validation pipe yang sudah dibuat
    // validasi terlebih dahulu menggunakan validation pipie
    // @Body(new ValidationPipe(loginUserReqValidation))
    @Body() request: LoginUserReq,
  ) {
    return console.log(request);
  }
}
