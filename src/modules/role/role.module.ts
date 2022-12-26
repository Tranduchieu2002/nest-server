import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserEntity } from '../../modules/user/user.entity';
import { PermissionsEntity } from '../permissions/permission.entity';
import { RoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsEntity, RoleEntity, UserEntity]),
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RolesModule {}
