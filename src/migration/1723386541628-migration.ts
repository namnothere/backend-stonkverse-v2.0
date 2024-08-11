import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723386541628 implements MigrationInterface {
  name = 'Migration1723386541628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`answer_quiz\` (\`id\` varchar(36) NOT NULL, \`answer\` text NOT NULL, \`score\` float NOT NULL DEFAULT '0', \`courseDataId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_015306ed15d033efb91bc2e0ccd\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_7fc7d21773df0b75ea1bd2d4791\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_7fc7d21773df0b75ea1bd2d4791\``);
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_015306ed15d033efb91bc2e0ccd\``);
    await queryRunner.query(`DROP TABLE \`answer_quiz\``);
  }
}
