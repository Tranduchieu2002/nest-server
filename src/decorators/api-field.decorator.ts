import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Contains,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  Max,
  Min,
} from 'class-validator';
import { isNumber } from 'lodash';
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
  return applyDecorators(IsOptional, NumberField(options));
}

export function StringField(
  options: Omit<ApiPropertyOptions, 'type' | 'require'> & IStringFieldOptions,
) {
  const { length, swagger, contains, isEmail } = options;
  const decorators = [Type(() => Number)];
  if (options.length) {
    decorators.push(Length(0, length));
  }
  if (contains) {
    decorators.push(Contains(contains));
  }
  if (swagger) {
    decorators.push(ApiProperty(options));
  }
  if (isEmail) {
    decorators.push(IsEmail({}));
  }
  return applyDecorators(...decorators);
}
