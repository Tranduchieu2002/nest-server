import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  @Transform(({ value }) => value.toString())
  password: string;

  @IsBoolean()
  @Expose()
  @Transform(({ value }) => Boolean(value))
  remember: boolean;

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

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @Column()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
} */
