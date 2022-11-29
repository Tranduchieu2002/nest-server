import { BaseDto } from 'modules/base/base.dto';
import { BaseEntity } from 'modules/base/base.entity';
import { Constructor } from 'types';

export function UseDto(
  dtoClass: Constructor<BaseDto, [BaseEntity]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
