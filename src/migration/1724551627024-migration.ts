import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724551627024 implements MigrationInterface {
  name = 'Migration1724551627024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_015306ed15d033efb91bc2e0ccd\``);
    await queryRunner.query(`DROP INDEX \`IDX_3e1f52ec904aed992472f2be14\` ON \`users\``);
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` CHANGE \`courseDataId\` \`questionId\` varchar(36) NULL`);
    await queryRunner.query(
      `CREATE TABLE \`cloudinary_file\` (\`id\` varchar(36) NOT NULL, \`public_id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL DEFAULT 'thumbnail', \`courseThumbnailId\` varchar(36) NULL, \`courseCurriculumId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`answers\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`question\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`title\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`max_score\` float NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`courseId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`deletedAt\` datetime(6) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`thumbnailId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD UNIQUE INDEX \`IDX_71fce3f397edeeae4d27b78c46\` (\`thumbnailId\`)`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`curriculumId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` ADD UNIQUE INDEX \`IDX_d27653784e038eb8430bee72ed\` (\`curriculumId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_71fce3f397edeeae4d27b78c46\` ON \`course\` (\`thumbnailId\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d27653784e038eb8430bee72ed\` ON \`course\` (\`curriculumId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_a69cba15226ae20e369355fa593\` FOREIGN KEY (\`questionId\`) REFERENCES \`question_quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_quiz\` ADD CONSTRAINT \`FK_22e52cde5b5137ab2898c217825\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cloudinary_file\` ADD CONSTRAINT \`FK_dbb9d0034dc370bb33c3747e773\` FOREIGN KEY (\`courseThumbnailId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cloudinary_file\` ADD CONSTRAINT \`FK_2360cb14653d4deea15d534201a\` FOREIGN KEY (\`courseCurriculumId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_71fce3f397edeeae4d27b78c460\` FOREIGN KEY (\`thumbnailId\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_d27653784e038eb8430bee72ed7\` FOREIGN KEY (\`curriculumId\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_d27653784e038eb8430bee72ed7\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_71fce3f397edeeae4d27b78c460\``);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP FOREIGN KEY \`FK_2360cb14653d4deea15d534201a\``);
    await queryRunner.query(`ALTER TABLE \`cloudinary_file\` DROP FOREIGN KEY \`FK_dbb9d0034dc370bb33c3747e773\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP FOREIGN KEY \`FK_22e52cde5b5137ab2898c217825\``);
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_a69cba15226ae20e369355fa593\``);
    await queryRunner.query(`DROP INDEX \`REL_d27653784e038eb8430bee72ed\` ON \`course\``);
    await queryRunner.query(`DROP INDEX \`REL_71fce3f397edeeae4d27b78c46\` ON \`course\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP INDEX \`IDX_d27653784e038eb8430bee72ed\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`curriculumId\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP INDEX \`IDX_71fce3f397edeeae4d27b78c46\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`thumbnailId\``);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`courseId\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`max_score\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`title\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`question\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`answers\` json NULL`);
    await queryRunner.query(`DROP TABLE \`cloudinary_file\``);
    await queryRunner.query(`ALTER TABLE \`answer_quiz\` CHANGE \`questionId\` \`courseDataId\` varchar(36) NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3e1f52ec904aed992472f2be14\` ON \`users\` (\`avatarId\`)`);
    await queryRunner.query(
      `ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_015306ed15d033efb91bc2e0ccd\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
