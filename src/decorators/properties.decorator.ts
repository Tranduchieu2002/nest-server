import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { castArray, isNil } from 'lodash';

export const ApiEnumProperty = (options: Omit<ApiPropertyOptions, 'type'>) => {
  return ApiProperty({
    type: 'emum',
    ...options,
  });
};

export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}
