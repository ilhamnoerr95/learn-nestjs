import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MemberService } from './users/member/member.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly memberService: MemberService,
  ) {}

  @Get()
  getHello(): string {
    this.memberService.sendEmail('root app');
    return this.appService.getHello();
  }
}
