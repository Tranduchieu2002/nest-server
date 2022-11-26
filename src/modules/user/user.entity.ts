import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ROLES } from '../../constants/roles';
import { UseDto } from '../../decorators/useDto.decorator';
import { RoleEntity } from '../../modules/role/role.entity';
import { BaseEntity, IBaseEntity } from '../base/base.entity';
import { UserDto } from './dtos/user.dto';

export interface IUserEntity extends IBaseEntity<UserDto> {
  email?: string;

  password?: string;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends BaseEntity<UserDto> implements IUserEntity {
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => RoleEntity, (role) => role.name)
  @JoinColumn()
  role: ROLES;
}
