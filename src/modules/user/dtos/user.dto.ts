import { StringField } from '@/decorators/api-field.decorator';
import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from '../../../modules/base/base.dto';
import { RoleDto, RoleEntity } from '../../../modules/role/role.entity';
import { UserEntity } from '../user.entity';
export type UserDtoOptions = Partial<{ isActive: boolean , isHasRoles: boolean}>;

export class UserDto extends BaseDto {
  @IsString()
  email?: string;

  @IsString()
  password?: string;
  
  @IsString()
  name: string;

  roles: RoleDto[];

  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.email = user.email;
    this.name = user.name;
    if(options?.isHasRoles)
      this.roles = user.roles.map(role => role.toDto())
  }
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
