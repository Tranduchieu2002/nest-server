import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../modules/role/role.entity';
import { PermissionsEntity } from './permission.entity';
import { PermissionsController } from './permisson.controller';
import { PermissionsSevice } from './permisson.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity, RoleEntity])],
  providers: [PermissionsController, PermissionsSevice],
  exports: [PermissionsSevice],
})
export class PermissionsModule {}
