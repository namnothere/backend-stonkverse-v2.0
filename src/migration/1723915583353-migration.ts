import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723915583353 implements MigrationInterface {
  name = 'Migration1723915583353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`token\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`activation_code\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`activation_code\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`token\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
  }
}
