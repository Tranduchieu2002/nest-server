import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEnum } from '../../constants/roles';
import { UseDto } from '../../decorators/useDto.decorator';
import { BaseDto } from '../../modules/base/base.dto';
import { BaseEntity } from '../../modules/base/base.entity';
import { PermissionsEntity } from '../permissions/permission.entity';

export class RoleDto extends BaseDto {
  @IsString()
  name: string;
  constructor(roleE: RoleEntity) {
    super(roleE, {
      excludeFields: true,
    });
    this.name = roleE.name;
  }
}

@Entity('roles')
@UseDto(RoleDto)
export class RoleEntity extends BaseEntity {
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
