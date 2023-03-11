import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { StringConverter } from '@server/utils';
import { StringField, StringOptionalField } from '../../decorators';

export class SignUpDto {
  @StringField({isEmail: true, swagger: true})
  @Expose()
  email: string;

  @StringField({min: 6, max: 22, swagger: true})
  @Expose()
  @Transform(({ value }) => value.toString())
  password: string;

  @IsBoolean()
  @Expose()
  @ApiProperty({ required: false, default: false})
  @Transform(({ value }) => Boolean(value))
  remember: boolean;

  @StringField({swagger: true, min: 3, max: 22})
  readonly firstName: string

  @StringField({swagger: true, min: 3, max: 22})
  readonly lastName: string

  @Expose()
  get fullName() {
    const fullName: string = StringConverter.combineName(this.firstName, this.lastName);
    return fullName;
  }

  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}

/* 
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

import { Trim } from '../../../decorators/transform.decorators';

*/
export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  readonly password: string;

  @ApiProperty()
  phone: string;
}
