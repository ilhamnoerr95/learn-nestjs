import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

// sudah di setup oleh pipe transform
// membuat validation pipe dinamis dari turunan
// class pipe transform
@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodtype: ZodType) {}
  // eslint-disable-next-line
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('penasarn', value);

    // lebih specifi untuk validasi dari data type yang dilempar
    // if (metadata.type === 'body') {
    //   return this.zodtype.parse(value);
    // } else {
    //   return value;
    // }
    return this.zodtype.parse(value);
  }
}
