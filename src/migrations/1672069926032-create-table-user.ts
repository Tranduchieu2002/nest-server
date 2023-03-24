import type { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateUsersTable1672069926032 implements MigrationInterface {
  name = 'createUsersTable1672069926032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"status_enum\" AS ENUM('ACTIVE', 'INACTIVE', 'PUBLISH')",
    );
    await queryRunner.query(`
      CREATE TABLE "photos" (
        "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP         DEFAULT null,
        "status"    "status_enum"      NOT NULL DEFAULT 'ACTIVE',
        "url"        character varying NOT NULL,
        "original_filename" character varying,
        "width"        integer          NOT NULL DEFAULT 200,
        "height"       integer          NOT NULL DEFAULT 200,
        "public_id"    character varying, 
        "format"       character varying,
        "asset_id"     character varying, 
        CONSTRAINT   "PK_5f468aeec91e477e84b46bb8caa" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP         DEFAULT null,
        "status"    "status_enum"     NOT NULL DEFAULT 'ACTIVE',
        "email"     character varying,
        "date_of_birth" Date,
        "first_name"      character varying,
        "last_name"      character varying,
        "password"  character varying,
        "avatar_id" uuid,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
    await queryRunner.createIndex('users', {
      name: 'users_email_idx',
      columnNames: ['email'],
      isUnique: true,
    } as TableIndex);

    await queryRunner.createIndex('users', {
      name: 'users_id_idx',
      columnNames: ['id'],
      isUnique: true,
    } as TableIndex);

    await queryRunner.query(`
    CREATE INDEX "idx_Photo_avatarId" ON "photos" (id);
   `);
    await queryRunner.query(`
      ALTER TABLE "users" ADD CONSTRAINT "FK_7df8c74362837f956d02c03dbf7" FOREIGN KEY ("avatar_id") REFERENCES "photos"("id")
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE "status_enum"');
    await queryRunner.query(
      'ALTER TABLE users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" ',
    );
  }
}
