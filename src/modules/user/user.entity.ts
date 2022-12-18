import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
