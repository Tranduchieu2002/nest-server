import type { MigrationInterface, QueryRunner } from 'typeorm';
import { StringConverter } from '@server/utils';
import { RoleEnum } from '@server/constants';
import { RoleEntity } from '../../modules/role/role.entity';
import { UserEntity } from '../../modules/user/user.entity';
import { BcryptService } from '../../modules/auth/services/bcrypt.service';
import { SystemFileUtils } from '../read-files';
import { PermissionsEntity } from '../../modules/permissions/permission.entity';
import { RoleService } from '../../modules/role/role.service';

export class CreateAdmin1671965390378 implements MigrationInterface {
  name = 'createAdmin1671965390378';

  splitFullname(fullname): ReturnType<typeof StringConverter.splitName > {
    return StringConverter.splitName(fullname)
  }
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultAdmin: any[] = await SystemFileUtils.readYamlFilesFromFixtures();
    const bcryptService  = new BcryptService()
    const userRepository = queryRunner.manager.getRepository(UserEntity)
    const roleRepository = queryRunner.manager.getRepository(RoleEntity);
    const permissionRepository =
      queryRunner.manager.getRepository(PermissionsEntity);
    const roleService = new RoleService(roleRepository, permissionRepository)
    for(let userSystem of defaultAdmin) {

      const adminInfo = userSystem.info
      const { firstName, lastName } = this.splitFullname(adminInfo.name)
      adminInfo.firstName = firstName;
      adminInfo.lastName = lastName;
      delete adminInfo.name;
      adminInfo.password = bcryptService.generateHash(adminInfo.password)

      const adminEnity : UserEntity = userRepository.create(adminInfo as UserEntity) 
      const adminRole = StringConverter.stringToArray(userSystem.roles) as RoleEnum[];
      const adminRoles = new Array()
      const adminPermissions = StringConverter.stringToArray(userSystem.permissions)
      if(!adminPermissions) return;
      for(let role of adminRole) {
        adminRoles.push(await roleService.createRoleWithPermissions(role, adminPermissions))
      }
      adminEnity.roles = adminRoles
      userRepository.save(adminEnity)
    }
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
