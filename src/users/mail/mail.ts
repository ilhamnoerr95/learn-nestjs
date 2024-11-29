// import { Injectable } from '@nestjs/common';

// @Injectable()
// anggapan tidak bisa menggunakna injectable karena thirdpart
export class Mail {
  sendMail(params: string) {
    console.info(`send email ${params}`);
  }
}

export const mailClass = new Mail();
