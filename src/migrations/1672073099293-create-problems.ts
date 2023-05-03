import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateSolutionsTable1672073099293 implements MigrationInterface {
  name = 'CreateSolutionsTable1672073099293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"difficulty_enum\" AS ENUM('HARD', 'EASY', 'MEDIUM')",
    );

    await queryRunner.query(`
    CREATE TABLE "problems" (
      "id"         	uuid              NOT NULL DEFAULT uuid_generate_v4(),
      "_iid"       	SERIAL            NOT NULL,
      "created_at" 	TIMESTAMP         NOT NULL DEFAULT now(),
      "updated_at" 	TIMESTAMP         NOT NULL DEFAULT now(),
      "deleted_at" 	TIMESTAMP         DEFAULT null,
      "title"			  character varying NOT NULL DEFAULT '',
      "status"    	"status_enum"     NOT NULL DEFAULT 'ACTIVE',
      "difficulty   "difficulty_enum" NOT NULL,
      CONSTRAINT   	"FK_problems_id" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.createIndex('problems', {
      name: 'problems__iid_idx',
      columnNames: ['_iid'],
      isUnique: true,
    } as TableIndex);

    await queryRunner.createIndex('problems', {
      name: 'problems_id_idx',
      columnNames: ['id'],
      isUnique: true,
    } as TableIndex);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TYPE "difficulty_enum"');
    await queryRunner.dropTable('problems');
  }
}
