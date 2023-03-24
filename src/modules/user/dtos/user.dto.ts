import { StringField } from '@/decorators/api-field.decorator';
import { PhotoDto } from '../../../modules/photo/photo.dto';
import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from '../../../modules/base/base.dto';
import { RoleDto, RoleEntity } from '../../../modules/role/role.entity';
import { UserEntity } from '../user.entity';
export type UserDtoOptions = Partial<{
  isActive: boolean;
  isHasRoles: boolean;
  isAvatar: boolean;
}>;

export class UserDto extends BaseDto {
  @IsString()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  fullName?: string = '';

  dateOfBirth?: Date;

  roles: RoleDto[];

  avatar?: PhotoDto;

  constructor(user: UserEntity, options?: UserDtoOptions) {
    super(user);
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.dateOfBirth = user.dateOfBirth;
    if (options?.isHasRoles)
      this.roles = user.roles.map((role) => role.toDto());
    if (options?.isAvatar && user.avatar) this.avatar = user.avatar.toDto();
  }
  static plainToClass<T>(instance: new (...args: any[]) => T, object: T): T {
    return plainToInstance(instance, object, {
      exposeUnsetFields: true,
      excludeExtraneousValues: true,
    });
  }
}
