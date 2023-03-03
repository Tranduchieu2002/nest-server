import { QueryRunner } from 'typeorm';
import { SystemFileUtils } from '../read-files';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleEntity } from '../../modules/role/role.entity';
import { RoleService } from '../../modules/role/role.service';

export class CreateRoles {
  name = 'createRoles1669048572521';

  constructor() {} // private readonly roleRepository: Repository<RoleEntity>, // @InjectRepository(RoleEntity) // private readonly permissionRepository: Repository<PermissionsEntity>, // @InjectRepository(PermissionsEntity)
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultRoles: any[] = await SystemFileUtils.getConfigs(
      'permissons.json',
    );

    const roleRepository = queryRunner.manager.getRepository(RoleEntity);
    const permissionRepository =
    queryRunner.manager.getRepository(PermissionsEntity);
    const roleService = new RoleService(roleRepository, permissionRepository)
    for (const role of defaultRoles) {
      const permissions: string[] = role.permissions;
      await roleService.createRoleWithPermissions(role.name, permissions)
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('permissions');
  }
}
