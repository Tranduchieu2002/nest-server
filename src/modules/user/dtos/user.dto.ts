import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { ROLES } from '../../../constants/roles';
import { BaseDto } from '../../../modules/base/base.dto';
import { UserEntity } from '../user.entity';
export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends BaseDto {
  @IsString()
  email?: string;

  @IsString()
  password?: string;
  @IsEnum(ROLES)
  role: ROLES;
  isActive?: boolean;
  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.email = user.email;
    this.role = user.role;

    this.isActive = options?.isActive;
  }
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
