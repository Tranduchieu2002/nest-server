import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitApplication1672023126032 implements MigrationInterface {
  name = 'initApplication1672023126032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "application_configs"
      (
        "id"         uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP        NOT NULL DEFAULT now(),
        "is_initialized" boolean       NOT NULL DEFAULT true
      )`);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}