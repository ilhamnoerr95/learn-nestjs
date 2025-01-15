import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  // isi dari context yaitu isi request/ responsenya,
  // next params mengacu pada controller
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle mengacu pada response pada body
    // untuk modifikasi menggunakan pipe
    return next.handle().pipe(
      map((value) => {
        // mengubah isi dari response timestamp
        value.timestamp = new Date();
        return value;
      }),
    );
  }
}
