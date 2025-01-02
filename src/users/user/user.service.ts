import { Injectable } from '@nestjs/common';
import { ValidationService } from '../../validation/validation/validation.service';
import { z } from 'zod';

@Injectable()
export class UsersService {
  constructor(private validationService: ValidationService) {}
  sayHello(name: string): string {
    const schema = z.string().min(3).max(10);
    const result = this.validationService.validate(schema, name);
    return `halo nama aku ${result}`;
  }
}
