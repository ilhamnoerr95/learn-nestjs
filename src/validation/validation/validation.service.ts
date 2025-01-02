import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  // validation service
  validate<T>(schema: ZodType<T>, data: T): T {
    return schema.parse(data);
  }
}
