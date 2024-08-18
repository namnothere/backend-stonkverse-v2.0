import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723978673141 implements MigrationInterface {
  name = 'Migration1723978673141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatarId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_3e1f52ec904aed992472f2be14\` (\`avatarId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3e1f52ec904aed992472f2be14\` ON \`users\` (\`avatarId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_3e1f52ec904aed992472f2be147\` FOREIGN KEY (\`avatarId\`) REFERENCES \`avatar\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_3e1f52ec904aed992472f2be147\``);
    await queryRunner.query(`DROP INDEX \`REL_3e1f52ec904aed992472f2be14\` ON \`users\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_3e1f52ec904aed992472f2be14\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatarId\``);
  }
}
