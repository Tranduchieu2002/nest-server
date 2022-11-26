import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { UseDto } from '../../decorators/useDto.decorator';
import { BaseDto } from '../../modules/base/base.dto';
import { BaseEntity } from '../../modules/base/base.entity';

class RoleDto extends BaseDto {
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
    unique: true,
    type: 'character',
  })
  name: string;
}
