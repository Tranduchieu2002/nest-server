import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
  name = 'createUsersTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"status_enum\" AS ENUM('ACTIVE', 'INACTIVE')",
    );
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP         DEFAULT null,
        "status"    "status_enum"     NOT NULL DEFAULT 'ACTIVE',
        "email"     character varying,
        "password"  character varying,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
