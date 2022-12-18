import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPermissions1669048572521 implements MigrationInterface {
  name = 'createPermissions1669048572521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "roles"
      (
        "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "name"      "user_roles_enum" NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP         DEFAULT null,
        CONSTRAINT  "FK_a3ffb1c0c8416b9fc6f907b7433"  PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`
      CREATE TABLE "permissions"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "name"      character varying,
        "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP         DEFAULT null,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc5f907b7433" PRIMARY KEY ("id")
      )`);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
