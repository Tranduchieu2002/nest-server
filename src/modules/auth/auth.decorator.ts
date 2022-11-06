import {
  applyDecorators,
  Param,
  ParseUUIDPipe,
  PipeTransform,
  Type,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from './jwt.guard';

export function Auth(options?: Partial<{ public: boolean }>): MethodDecorator {
  const isPublicRoute = options?.public;

  return applyDecorators(UseGuards(JwtGuard));
}

export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
