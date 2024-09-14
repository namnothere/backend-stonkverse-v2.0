import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726385053435 implements MigrationInterface {
  name = 'Migration1726385053435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`email\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`email\` DROP COLUMN \`created_at\``);
  }
}
