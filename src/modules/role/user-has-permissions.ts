import { PermissionsEntity } from 'modules/permissions/permission.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../../modules/user/user.entity';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'user-has-permissions',
})
export class UserHasPermissionsEntity {
  @OneToOne(() => UserEntity)
  userId: Uuid;

  @OneToOne(() => RoleEntity, (role) => role.id)
  roleId: Uuid;

  @OneToMany(
    () => PermissionsEntity,
    (roleHasPermissions) => roleHasPermissions.name,
  )
  permissions: PermissionsEntity[];
}
