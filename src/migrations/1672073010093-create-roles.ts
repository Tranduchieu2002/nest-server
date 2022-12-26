import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPermissions1672073010093 implements MigrationInterface {
  name = 'createPermissions1672073010093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE \"user_roles_enum\" AS ENUM('USER', 'ADMIN', 'SUPER-ADMIN','GUEST')"),
    await queryRunner.query(`
      CREATE TABLE "roles"
      (
        "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "name"      "user_roles_enum" NOT NULL DEFAULT 'USER',
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP         DEFAULT null,
        "status"    "status_enum"     NOT NULL DEFAULT 'ACTIVE',
        CONSTRAINT  "FK_a3ffb1c0c8416b9fc6f907b7433"  PRIMARY KEY ("id")
      )`);

    await queryRunner.query(`
      CREATE TABLE "permissions"
      (
        "id"         uuid                NOT NULL DEFAULT uuid_generate_v4(),
        "name"       character varying,
        "created_at" TIMESTAMP           NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP           NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP           DEFAULT null,
        "status"     "status_enum"       NOT NULL DEFAULT 'ACTIVE',
        "model"      character varying,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc5f907b7433" PRIMARY KEY ("id")
      )`);
    await queryRunner.query(`
    CREATE TABLE "role_permissions"
    (
      "role_id"         uuid            NOT NULL DEFAULT uuid_generate_v4(),
      "permission_id"         uuid            NOT NULL DEFAULT uuid_generate_v4(),
      CONSTRAINT "FK_cou2hdic2c826451jd1j54q2ccca" FOREIGN KEY ("role_id") REFERENCES roles("id"),
      CONSTRAINT "FK_a3f929103947dza11c5f907b7433" FOREIGN KEY ("permission_id") REFERENCES permissions("id")
    )
  `)
    await queryRunner.query(`
      CREATE TABLE "user_roles"
      (
        "role_id"         uuid            NOT NULL DEFAULT uuid_generate_v4(),
        "user_id"         uuid            NOT NULL DEFAULT uuid_generate_v4(),
        CONSTRAINT "FK_a3ffb1c0iddii6b9fc5f907b7433" FOREIGN KEY ("role_id") REFERENCES roles("id"),
        CONSTRAINT "FK_a3ffsaqc0icc16b9fc5f907b7433" FOREIGN KEY ("user_id") REFERENCES users("id")
      )
    `)
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    
  }
}
