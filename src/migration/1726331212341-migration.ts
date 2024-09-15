import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726331212341 implements MigrationInterface {
  name = 'Migration1726331212341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_5e1c2337fb1ad0125e8a362f1e5\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c21023d28ffaf525f7ed74c7d13\``);
    await queryRunner.query(`DROP INDEX \`IDX_c21023d28ffaf525f7ed74c7d1\` ON \`order\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`deletedAt\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`register_course\` ADD \`deletedAt\` datetime(6) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_5e1c2337fb1ad0125e8a362f1e5\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c21023d28ffaf525f7ed74c7d13\` FOREIGN KEY (\`register_id\`) REFERENCES \`register_course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c21023d28ffaf525f7ed74c7d13\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_5e1c2337fb1ad0125e8a362f1e5\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c21023d28ffaf525f7ed74c7d1\` ON \`order\` (\`register_id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c21023d28ffaf525f7ed74c7d13\` FOREIGN KEY (\`register_id\`) REFERENCES \`register_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_5e1c2337fb1ad0125e8a362f1e5\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
