import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../user/connection';
import { Mail } from '../mail/mail';

// MODULE REFERENCE
// biusa menggunakana data/informasi lintas module
// ini seperti global variabel yg bisa diambil darimanasaja
// keep in mind that data must be exist, when the data not exist
// it will be error
@Injectable()
export class MemberService {
  constructor(private moduleref: ModuleRef) {}

  getConnectionName(): string {
    // mengambil provider connection
    // ketika member service ini sudah terdaftar dalam provider
    // maka nestjs akan handle setiap fungsi dr background
    // agar moduleref berfungsi demikian, dimana bisa digunakan untuk
    // akses dari setiap service yg ada dalam 1 modul yg sm
    const connection = this.moduleref.get(Connection);
    return connection.getConnection();
  }

  sendEmail(param: string) {
    // ambil provider mail
    const mail = this.moduleref.get(Mail);
    mail.sendMail(param);
  }
}
