  import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { UseDto } from '../../decorators/useDto.decorator';
import { RoleEntity } from '../../modules/role/role.entity';
import { BaseEntity, IBaseEntity } from '../base/base.entity';
import { PhotoEntity } from '../photo/photo.entity';
import { UserDto, UserDtoOptions } from './dtos/user.dto';

export interface IUserEntity extends IBaseEntity<UserDto> {
  email?: string;
  firstName: string;
  lastName: string;
  password?: string;
  roles: RoleEntity[];
  dateOfBirth?: Date;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends BaseEntity<UserDto, UserDtoOptions> implements IUserEntity {
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password: string;
  
  @Column({nullable: false})
  firstName: string;

  @Column({nullable: false})
  lastName: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: Date;

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

  @OneToOne(() => PhotoEntity, photo => photo, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @JoinColumn()
  avatar: PhotoEntity;
}
