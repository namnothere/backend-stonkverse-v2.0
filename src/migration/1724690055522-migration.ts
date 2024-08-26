import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724690055522 implements MigrationInterface {
  name = 'Migration1724690055522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_39231fcb10d7a7ff129ce7e51f\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`IDX_c85809dd73f81563e7ff097460\` ON \`course\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c85809dd73f81563e7ff097460\` ON \`course\` (\`curriculum_id\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_39231fcb10d7a7ff129ce7e51f\` ON \`course\` (\`thumbnail_id\`)`);
  }
}
