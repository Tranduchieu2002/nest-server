import type { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLES } from '../constants/roles';

export class createPermissions1669048572521 implements MigrationInterface {
  name = 'createPermissions1669048572521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE \"user_roles_enum\" AS ENUM('${ROLES.USER}', '${ROLES.ADMIN}', '${ROLES.SUPER_ADMIN}')`,
    );
    await queryRunner.query(`
      CREATE TABLE "roles"
      (
        "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "name"      "user_roles_enum" NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
        CONSTRAINT  "FK_a3ffb1c0c8416b9fc6f907b7433"  PRIMARY KEY ("id"),
        CONSTRAINT  "UQ_97672ac88f7897c4dd47f7c8be3" UNIQUE ("name")
      )`);
    await queryRunner.query(`
      CREATE TABLE "permissions"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "name"      character varying,
        "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP         NOT NULL DEFAULT null,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc5f907b7433" PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`
      CREATE TABLE "role_has_permissions"
      (
        "permissions_id"    uuid NOT NULL,
        "role_id"    uuid NOT NULL,
        CONSTRAINT "FK_a3ffb1c0c8416b9fc6f907b7433" FOREIGN KEY ("permissions_id") 
        REFERENCES "permissions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "REL_19f4e08665a1f4bbbb7d5631f3" FOREIGN KEY ("role_id") 
        REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "role_has_permissions"');
    await queryRunner.query('DROP TYPE "permissions"');
    await queryRunner.query('DROP TABLE "roles"');
    await queryRunner.query('DROP TYPE "user_roles_enum"');
  }
}
