import { Column, Entity } from 'typeorm';
import { ROLES } from '../../constants/roles';
import { UseDto } from '../../decorators/useDto.decorator';
import { BaseEntity, IBaseEntity } from '../base/base.entity';
import { UserDto } from './dtos/user.dto';

export interface IUserEntity extends IBaseEntity<UserDto> {
  email?: string;

  password?: string;

  role: ROLES;
}
export type Constructor<T, Arguments extends unknown[] = undefined[]> = new (
  ...arguments_: Arguments
) => T;

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends BaseEntity<UserDto> implements IUserEntity {
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;
}
