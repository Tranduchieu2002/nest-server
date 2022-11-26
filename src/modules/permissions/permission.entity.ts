import { Column, Entity } from 'typeorm';
import { UseDto } from '../../decorators/useDto.decorator';
import { BaseEntity } from '../../modules/base/base.entity';
import { PermissionsDto } from './permission.dto';

interface IPermissionsEntity {
  name: string;
}

@Entity({ name: 'permissions' })
@UseDto(PermissionsDto)
export class PermissionsEntity
  extends BaseEntity<PermissionsDto>
  implements IPermissionsEntity
{
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
}
