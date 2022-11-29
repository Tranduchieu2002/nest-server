import { MigrationInterface, QueryRunner } from 'typeorm';
import { SystemFileUtils } from '../helpers/read-files';

export class CreateRoles implements MigrationInterface {
  name = 'createRoles1669048572521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPermissions: any[] = await SystemFileUtils.getConfigs(
      'permissons.json',
    );
    for (const role of defaultPermissions) {
      // let permissions = role.permissions;
      // let permissionIns: PermissionsEntity[] = [];
      // const permissionsIns = dataSource.getRepository(PermissionsEntity);
      // for (let i = 0; i < permissions.length; ++i) {
      //   permissionIns[i] = permissionsIns.create({ name: permissions[i] });
      //   await dataSource.manager.save(permissionIns[i]);
      // }
      // const roleRepo = dataSource.getRepository(RoleEntity);
      // const roleIns = dataSource.getRepository(RoleEntity).create({
      //   name: role.name,
      // });
      // roleIns.permissions = permissionIns;
      // roleRepo.save(roleIns);
      await queryRunner.query(
        `INSERT INTO "roles" ("name") VALUES('${role.name}')`,
      );
      const permissions = role.permissions;
      // for (const permission of permissions) {
      //   await queryRunner.query(
      //     `INSERT INTO "permissions" ("name") VALUES('${permission}')`,
      //   );
      // }
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('permissions');
  }
}
