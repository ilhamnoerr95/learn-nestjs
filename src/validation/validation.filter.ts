import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

// harus registrasi dlu sama seperti middleware
// untuk menggunakan filter kita harus gunakan decorator @UseFilter
// @UseFilter bisa digunakan di method atau filter class controller
// jika ditempatkan di class controller maka secara otomatis semua router method akan terimplentasi useFilter
// validation error untuk zod saja
@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    // ini harus dimapping
    console.log(exception.errors[0].message, 'ini exception dari filter');
    response.status(400).json({
      code: 400,
      errors: exception.errors,
    });
  }
}
