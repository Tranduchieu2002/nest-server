import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserEntity } from '../../modules/user/user.entity';
import { PermissionsEntity } from './permission.entity';
import { PermissionsController } from './permisson.controller';
import { PermissionsSevice } from './permisson.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsEntity, RoleEntity, UserEntity]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsSevice],
  exports: [PermissionsSevice],
})
export class PermissionsModule {}
