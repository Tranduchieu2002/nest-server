import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1672069926032 implements MigrationInterface {
  name = 'createUsersTable1672069926032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(      "CREATE TYPE \"status_enum\" AS ENUM('ACTIVE', 'INACTIVE', 'PUBLISH')")
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMPZ         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPZ         NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPZ         DEFAULT null,
        "status"    "status_enum"     NOT NULL DEFAULT 'ACTIVE',
        "email"     character varying,
        "first_name"      character varying,
        "last_name"      character varying,
        "password"  character varying,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE "status_enum"');
    await queryRunner.query('ALTER TABLE users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" ')
  }
}