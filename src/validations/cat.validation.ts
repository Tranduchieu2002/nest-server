/* eslint-disable prettier/prettier */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class CatValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value, '   ', metadata);
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    console.log(errors);
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    throw new BadRequestException('Validation failed');
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
