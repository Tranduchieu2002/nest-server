import { QueryRunner } from 'typeorm';
import { SystemFileUtils } from '../helpers/read-files';
import { PermissionsEntity } from '../modules/permissions/permission.entity';
import { RoleEntity } from '../modules/role/role.entity';

export class CreateRoles {
  name = 'createRoles1669048572521';

  constructor() {} // private readonly roleRepository: Repository<RoleEntity>, // @InjectRepository(RoleEntity) // private readonly permissionRepository: Repository<PermissionsEntity>, // @InjectRepository(PermissionsEntity)
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPermissions: any[] = await SystemFileUtils.getConfigs(
      'permissons.json',
    );

    const roleRepository = queryRunner.manager.getRepository(RoleEntity);
    const permissionRepository =
      queryRunner.manager.getRepository(PermissionsEntity);
    for (const role of defaultPermissions) {
      const roleInstance = roleRepository.create({
        name: role.name,
      });
      const permissions: string[] = role.permissions;
      let rolePermissions: any = [];

      for (const permission of permissions) {
        const permisisonAfterSave = permissionRepository.create({
          name: permission,
          model: role.name,
        });
        rolePermissions.push(permisisonAfterSave);
      }
      rolePermissions = await permissionRepository.save(rolePermissions);
      roleInstance.permissions = rolePermissions;
      console.log(roleInstance);
      await roleRepository.save(roleInstance);
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('permissions');
  }
}
