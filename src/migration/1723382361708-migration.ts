import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723382361708 implements MigrationInterface {
  name = 'Migration1723382361708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`FK_2b46d6530029e89c2bb2db3a799\` ON \`link\``);
    await queryRunner.query(`DROP INDEX \`FK_6a72e1db67c335be0c071cfe1d9\` ON \`question_quiz\``);
    await queryRunner.query(`DROP INDEX \`FK_73aac6035a70c5f0313c939f237\` ON \`comment\``);
    await queryRunner.query(`DROP INDEX \`FK_a96c50a5a085526d834b734ac4f\` ON \`comment\``);
    await queryRunner.query(`DROP INDEX \`FK_c0354a9a009d3bb45a08655ce3b\` ON \`comment\``);
    await queryRunner.query(`DROP INDEX \`FK_f4a3af67ddb294b0f24b59f66b5\` ON \`comment\``);
    await queryRunner.query(`DROP INDEX \`FK_6e6ef2cff8da880bb22fb9457bb\` ON \`course_data\``);
    await queryRunner.query(`DROP INDEX \`FK_8b9ed2a4b25b2b054ade3df9b8b\` ON \`layout\``);
    await queryRunner.query(`DROP INDEX \`FK_b9b5fc4bbe202710fdf22234227\` ON \`learning_progress\``);
    await queryRunner.query(`DROP INDEX \`FK_1ced25315eb974b73391fb1c81b\` ON \`notification\``);
    await queryRunner.query(`DROP INDEX \`FK_23cc750d9cc6216bc83bf8d6916\` ON \`order\``);
    await queryRunner.query(`DROP INDEX \`FK_caabe91507b3379c7ba73637b84\` ON \`order\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`answers\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`correct_answers\` json NULL`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`question\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`question\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comment_type\``);
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`comment_type\` varchar(255) NOT NULL DEFAULT 'REVIEW'`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`content\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`description\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`ratings\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`ratings\` float NULL`);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_info\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_info\` json NULL`);
    await queryRunner.query(
      `ALTER TABLE \`link\` ADD CONSTRAINT \`FK_2b46d6530029e89c2bb2db3a799\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_quiz\` ADD CONSTRAINT \`FK_6a72e1db67c335be0c071cfe1d9\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_a96c50a5a085526d834b734ac4f\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f4a3af67ddb294b0f24b59f66b5\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_73aac6035a70c5f0313c939f237\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course_data\` ADD CONSTRAINT \`FK_6e6ef2cff8da880bb22fb9457bb\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`layout\` ADD CONSTRAINT \`FK_8b9ed2a4b25b2b054ade3df9b8b\` FOREIGN KEY (\`imageId\`) REFERENCES \`banner_image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`learning_progress\` ADD CONSTRAINT \`FK_b9b5fc4bbe202710fdf22234227\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_23cc750d9cc6216bc83bf8d6916\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_23cc750d9cc6216bc83bf8d6916\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
    await queryRunner.query(`ALTER TABLE \`learning_progress\` DROP FOREIGN KEY \`FK_b9b5fc4bbe202710fdf22234227\``);
    await queryRunner.query(`ALTER TABLE \`layout\` DROP FOREIGN KEY \`FK_8b9ed2a4b25b2b054ade3df9b8b\``);
    await queryRunner.query(`ALTER TABLE \`course_data\` DROP FOREIGN KEY \`FK_6e6ef2cff8da880bb22fb9457bb\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_73aac6035a70c5f0313c939f237\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f4a3af67ddb294b0f24b59f66b5\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_a96c50a5a085526d834b734ac4f\``);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP FOREIGN KEY \`FK_6a72e1db67c335be0c071cfe1d9\``);
    await queryRunner.query(`ALTER TABLE \`link\` DROP FOREIGN KEY \`FK_2b46d6530029e89c2bb2db3a799\``);
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_info\``);
    await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_info\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`ratings\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`ratings\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`course\` ADD \`description\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`comment\` ADD \`content\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comment_type\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`comment_type\` enum ('REVIEW', 'QUESTION', 'REVIEW_REPLY', 'QUESTION_REPLY') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`question\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD \`question\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`correct_answers\``);
    await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP COLUMN \`answers\``);
    await queryRunner.query(`CREATE INDEX \`FK_caabe91507b3379c7ba73637b84\` ON \`order\` (\`userId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_23cc750d9cc6216bc83bf8d6916\` ON \`order\` (\`courseId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_1ced25315eb974b73391fb1c81b\` ON \`notification\` (\`userId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_b9b5fc4bbe202710fdf22234227\` ON \`learning_progress\` (\`userId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_8b9ed2a4b25b2b054ade3df9b8b\` ON \`layout\` (\`imageId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_6e6ef2cff8da880bb22fb9457bb\` ON \`course_data\` (\`courseId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_f4a3af67ddb294b0f24b59f66b5\` ON \`comment\` (\`courseDataId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_c0354a9a009d3bb45a08655ce3b\` ON \`comment\` (\`userId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_a96c50a5a085526d834b734ac4f\` ON \`comment\` (\`courseId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_73aac6035a70c5f0313c939f237\` ON \`comment\` (\`parentCommentId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_6a72e1db67c335be0c071cfe1d9\` ON \`question_quiz\` (\`courseDataId\`)`);
    await queryRunner.query(`CREATE INDEX \`FK_2b46d6530029e89c2bb2db3a799\` ON \`link\` (\`courseDataId\`)`);
  }
}
