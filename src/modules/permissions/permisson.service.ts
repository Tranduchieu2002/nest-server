import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserDto } from '../../modules/user/dtos/user.dto';
import { UserEntity } from '../../modules/user/user.entity';
import { PermissionsEntity } from './permission.entity';

@Injectable()
export class PermissionsSevice {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async generatePermissions(user: UserDto) {
    const userByRoles = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: user.id })
      .select([
        'user.id',
        'roles.id',
        'roles.name',
        'permissions.name',
        'permissions.id',
        'permissions.model',
      ])
      .leftJoin('user.roles', 'roles') // bar is the joined table
      .leftJoin('roles.permissions', 'permissions')
      .getOne();
    return userByRoles?.roles;
  }
}
