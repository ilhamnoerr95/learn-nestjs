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
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './user.service';
import { Connection } from './connection';
import { Mail } from '../mail/mail';
import { ThirdParty } from '../third-party/third-party';

@Controller('/api/users')
export class UserController {
  constructor(
    private userService: UsersService,
    private connection: Connection,
    private mailService: Mail,
    // kita memberi tahu bahwa kita menggunakan provide yg sudah ada
    @Inject('aliasProvider') private mailAlias: Mail,
    private thirdParty: ThirdParty,
  ) {}

  @Get('/connection')
  async connectionTes(): Promise<string> {
    this.thirdParty.save();
    this.mailService.sendMail('Not Alias success');
    this.mailAlias.sendMail('Alias');
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
  testInject(@Query('name') name: string): string {
    return this.userService.sayHello(name);
  }
}
