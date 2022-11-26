import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../modules/role/role.entity';

export class CreateRoles implements MigrationInterface {
  name = 'createRoles1669048572521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.connection.getRepository(RoleEntity);
    queryRunner.query(`INSERT INTO "roles" ("name") VALUES('ADMIN');
   `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
    await queryRunner.query('DROP TYPE "user_roles_enum"');
  }
}
