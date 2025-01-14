import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

// membuat service untuk schema
// validation bisa di taruh dalam controller atau masing2 service
@Injectable()
export class ValidationService {
  // validation service
  validate<T>(schema: ZodType<T>, data: T): T {
    return schema.parse(data);
  }
}
