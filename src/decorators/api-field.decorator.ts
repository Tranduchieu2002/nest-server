import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  Contains,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { isArray, isNumber, map, trim } from 'lodash';
import { ToArray } from './properties.decorator';

interface INumberFieldOptions {
  each?: boolean;
  minimum?: number;
  maximum?: number;
  int?: boolean;
  isPositive?: boolean;
  swagger?: boolean;
}

interface IStringFieldOptions {
  length?: number;
  contains?: string;
  isEmail?: boolean;
  swagger?: boolean;
  min?: number;
  max?: number;
}

export function NumberField(
  options: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions = {},
): PropertyDecorator {
  const decorators = [Type(() => Number)];

  const { each, int, minimum, maximum, isPositive, swagger } = options;

  if (swagger !== false) {
    decorators.push(
      ApiProperty({ type: Number, ...options, example: int ? 1 : 1.2 }),
    );
  }

  if (each) {
    decorators.push(ToArray());
  }

  if (int) {
    decorators.push(IsInt({ each }));
  } else {
    decorators.push(IsNumber({}, { each }));
  }

  if (isNumber(minimum)) {
    decorators.push(Min(minimum, { each }));
  }

  if (isNumber(maximum)) {
    decorators.push(Max(maximum, { each }));
  }

  if (isPositive) {
    decorators.push(IsPositive({ each }));
  }

  return applyDecorators(...decorators);
}

export function NumberOptionalField(
  options: Omit<ApiPropertyOptions, 'type' | 'require'> &
    INumberFieldOptions = {},
): PropertyDecorator {
  options.required = false;
  return applyDecorators(IsOptional(), NumberField(options));
}

export function StringField(
  options: Omit<ApiPropertyOptions, 'type' | 'require'> & IStringFieldOptions = {},
): PropertyDecorator {
  const { length, swagger, contains, isEmail, min , max } = options;
  const decorators = [IsNotEmpty(), IsString(), Trim()];
  if (options.length) {
    decorators.push(Length(0, length));
  }
  if (contains) {
    decorators.push(Contains(contains));
  }
  if(min) {
    decorators.push(MinLength(min));
  }
  if(max) {
    decorators.push(MaxLength(max));
  }
  if (swagger) {
    decorators.push(ApiProperty(options));
  }
  if (isEmail) {
    decorators.push(IsEmail());
  }
  return applyDecorators(...decorators);
}

export function StringOptionalField(
  options: Omit<ApiPropertyOptions, 'type' | 'require'> & IStringFieldOptions = {},
): PropertyDecorator {
  options.required = false;
  return applyDecorators(IsOptional(), StringField(options));
}

export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    if (isArray(value)) {
      return map(value, (v) => trim(v).replace(/\s\s+/g, ' '));
    }

    return trim(value).replace(/\s\s+/g, ' ');
  });
}