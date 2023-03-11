import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostNotFoundException } from '../../exceptions';
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
  ) { }
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

  async getUserPermissions(userId: Uuid): Promise<string[]> {
    console.log("userId ", userId)
    // const p = this.userRepository.createQueryBuilder('permissions').leftJoin("permissions.roles", "roles").leftJoin("roles.permisions")
    const permissions: { name: string }[] = await this.userRepository.manager.query(`
      SELECT p.name FROM permissions p
      WHERE EXISTS (
        SELECT 2
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        WHERE ur.user_id = '${userId}'
        AND rp.permission_id = p.id
    );`)
    if (!permissions) { throw new PostNotFoundException("Cannot found permissions !") };
    const converedPermission = permissions.map(permission => permission.name)
    return converedPermission;
  }
}
