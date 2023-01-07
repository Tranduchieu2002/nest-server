import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEnum } from '../../constants/roles';
import { UseDto } from '../../decorators/useDto.decorator';
import { BaseEntity } from '../../modules/base/base.entity';
import { PermissionsEntity } from '../permissions/permission.entity';
import { RoleDto } from './role.dto';

@Entity('roles')
@UseDto(RoleDto)
export class RoleEntity extends BaseEntity<RoleDto> {
  @Column({
    type: 'enum',
    enumName: 'user_roles_enum',
    default: RoleEnum.USER,
    enum: RoleEnum,
  })
  name: RoleEnum;

  @ManyToMany(() => PermissionsEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionsEntity[];
}
export { RoleDto };

