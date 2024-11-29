// import { Injectable } from '@nestjs/common';

// @Injectable()
// ini contoh untuk value provider
// anggapan tidak bisa menggunakna injectable karena thirdpart
export class Mail {
  sendMail(params: string) {
    console.info(`send email ${params}`);
  }
}

export const mailClass = new Mail();
