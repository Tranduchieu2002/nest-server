import { BaseDto } from 'modules/base/base.dto';
import { BaseEntity } from 'modules/base/base.entity';
import { Constructor } from 'modules/user/user.entity';

export function UseDto(
  dtoClass: Constructor<BaseDto, [BaseEntity]>,
): ClassDecorator {
  return (ctor) => {
    console.log({ ctor });
    ctor.prototype.dtoClass = dtoClass;
  };
}
