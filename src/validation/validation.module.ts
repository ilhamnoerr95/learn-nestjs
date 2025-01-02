import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

@Module({})
export class ValidationModule {
  static forRoot(isGlobal: boolean): DynamicModule {
    return {
      // module name used to  same with class name
      module: ValidationModule,
      providers: [ValidationService],
      exports: [ValidationService],
      global: isGlobal,
    };
  }
}
