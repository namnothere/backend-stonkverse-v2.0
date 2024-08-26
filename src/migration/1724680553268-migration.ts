import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724680553268 implements MigrationInterface {
  name = 'Migration1724680553268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP FOREIGN KEY \`FK_2360cb14653d4deea15d534201a\``);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP FOREIGN KEY \`FK_dbb9d0034dc370bb33c3747e773\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_71fce3f397edeeae4d27b78c460\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_d27653784e038eb8430bee72ed7\``);
    await queryRunner.query(`DROP INDEX \`IDX_71fce3f397edeeae4d27b78c46\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`IDX_d27653784e038eb8430bee72ed\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`REL_71fce3f397edeeae4d27b78c46\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`REL_d27653784e038eb8430bee72ed\` ON \`course\``);
    await queryRunner.query(
      `CREATE TABLE \`register_course\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`courseId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP COLUMN \`courseCurriculumId\``);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP COLUMN \`courseThumbnailId\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`curriculumId\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`estimatedPrice\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`thumbnailId\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`estimated_price\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`created_by\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`thumbnail_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD UNIQUE INDEX \`IDX_39231fcb10d7a7ff129ce7e51f\` (\`thumbnail_id\`)`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`curriculum_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD UNIQUE INDEX \`IDX_c85809dd73f81563e7ff097460\` (\`curriculum_id\`)`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`price\` float NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`purchased\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`purchased\` varchar(255) NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_39231fcb10d7a7ff129ce7e51f\` ON \`course\` (\`thumbnail_id\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c85809dd73f81563e7ff097460\` ON \`course\` (\`curriculum_id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_39231fcb10d7a7ff129ce7e51fc\` FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_c85809dd73f81563e7ff0974609\` FOREIGN KEY (\`curriculum_id\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_0cee76f91ee689335c2f57be92f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_116cba53a55ee67201d68197879\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_116cba53a55ee67201d68197879\``);
    await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_0cee76f91ee689335c2f57be92f\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_c85809dd73f81563e7ff0974609\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_39231fcb10d7a7ff129ce7e51fc\``);
    await queryRunner.query(`DROP INDEX \`REL_c85809dd73f81563e7ff097460\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`REL_39231fcb10d7a7ff129ce7e51f\` ON \`course\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`purchased\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`purchased\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`price\` int NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP INDEX \`IDX_c85809dd73f81563e7ff097460\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`curriculum_id\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP INDEX \`IDX_39231fcb10d7a7ff129ce7e51f\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`thumbnail_id\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`created_by\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`estimated_price\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`thumbnailId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`estimatedPrice\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`curriculumId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` ADD \`courseThumbnailId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` ADD \`courseCurriculumId\` varchar(36) NULL`);
    await queryRunner.query(`DROP TABLE \`register_course\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d27653784e038eb8430bee72ed\` ON \`course\` (\`curriculumId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_71fce3f397edeeae4d27b78c46\` ON \`course\` (\`thumbnailId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d27653784e038eb8430bee72ed\` ON \`course\` (\`curriculumId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_71fce3f397edeeae4d27b78c46\` ON \`course\` (\`thumbnailId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_d27653784e038eb8430bee72ed7\` FOREIGN KEY (\`curriculumId\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_71fce3f397edeeae4d27b78c460\` FOREIGN KEY (\`thumbnailId\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cloudinary_file\` ADD CONSTRAINT \`FK_dbb9d0034dc370bb33c3747e773\` FOREIGN KEY (\`courseThumbnailId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cloudinary_file\` ADD CONSTRAINT \`FK_2360cb14653d4deea15d534201a\` FOREIGN KEY (\`courseCurriculumId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
