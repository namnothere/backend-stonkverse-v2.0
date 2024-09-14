import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726321206031 implements MigrationInterface {
  name = 'Migration1726321206031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_23cc750d9cc6216bc83bf8d6916\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_0cee76f91ee689335c2f57be92f\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_116cba53a55ee67201d68197879\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`courseId\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP COLUMN \`courseId\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`total\` float NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`course_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`user_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`register_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD UNIQUE INDEX \`IDX_c21023d28ffaf525f7ed74c7d1\` (\`register_id\`)`);
    await queryRunner.query(`ALTER TABLE \`register_course\` ADD \`user_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`register_course\` ADD \`course_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_info\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_info\` text NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c21023d28ffaf525f7ed74c7d1\` ON \`order\` (\`register_id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_5e1c2337fb1ad0125e8a362f1e5\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c21023d28ffaf525f7ed74c7d13\` FOREIGN KEY (\`register_id\`) REFERENCES \`register_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_0a9c1150804775d49a05d48249d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_c05c32c8d65359d824496028ed1\` FOREIGN KEY (\`course_id\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_c05c32c8d65359d824496028ed1\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_0a9c1150804775d49a05d48249d\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c21023d28ffaf525f7ed74c7d13\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_5e1c2337fb1ad0125e8a362f1e5\``);
    await queryRunner.query(`DROP INDEX \`REL_c21023d28ffaf525f7ed74c7d1\` ON \`order\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_info\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_info\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP COLUMN \`course_id\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP COLUMN \`user_id\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP INDEX \`IDX_c21023d28ffaf525f7ed74c7d1\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`register_id\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`user_id\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`course_id\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`total\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` ADD \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`register_course\` ADD \`courseId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`courseId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_116cba53a55ee67201d68197879\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_0cee76f91ee689335c2f57be92f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_23cc750d9cc6216bc83bf8d6916\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
