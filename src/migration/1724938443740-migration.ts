import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724938443740 implements MigrationInterface {
    name = 'Migration1724938443740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`avatar\` (\`id\` varchar(36) NOT NULL, \`public_id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`link\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`courseDataId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer_quiz\` (\`id\` varchar(36) NOT NULL, \`answer\` text NOT NULL, \`score\` float NOT NULL DEFAULT '0', \`userId\` varchar(36) NULL, \`questionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_quiz\` (\`id\` varchar(36) NOT NULL, \`title\` text NOT NULL, \`correct_answers\` json NULL, \`max_score\` float NOT NULL DEFAULT '0', \`courseDataId\` varchar(36) NULL, \`courseId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course_data\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`video_url\` varchar(255) NULL, \`courseId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cloudinary_file\` (\`id\` varchar(36) NOT NULL, \`public_id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL DEFAULT 'thumbnail', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banner_image\` (\`id\` varchar(36) NOT NULL, \`public_id\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faq_item\` (\`id\` varchar(36) NOT NULL, \`question\` varchar(255) NOT NULL, \`answer\` varchar(255) NOT NULL, \`layout_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`layout\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`sub_title\` varchar(255) NOT NULL, \`banner_image_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`price\` float NOT NULL DEFAULT '0', \`estimated_price\` varchar(255) NULL, \`tags\` varchar(255) NULL, \`level\` varchar(255) NOT NULL, \`demo_url\` varchar(255) NULL, \`ratings\` float NULL, \`purchased\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`created_by\` varchar(255) NULL, \`thumbnail_id\` varchar(36) NULL, \`curriculum_id\` varchar(36) NULL, UNIQUE INDEX \`REL_39231fcb10d7a7ff129ce7e51f\` (\`thumbnail_id\`), UNIQUE INDEX \`REL_c85809dd73f81563e7ff097460\` (\`curriculum_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`comment_type\` varchar(255) NOT NULL DEFAULT 'REVIEW', \`title\` varchar(255) NULL, \`content\` text NULL, \`rating\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`courseId\` varchar(36) NULL, \`courseDataId\` varchar(36) NULL, \`parentCommentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`learning_progress\` (\`id\` varchar(36) NOT NULL, \`courseId\` varchar(255) NOT NULL, \`progress\` varchar(255) NOT NULL, \`progress_status\` varchar(255) NOT NULL DEFAULT 'NOT_STARTED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'unread', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`register_course\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, \`courseId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`activation_code\` varchar(255) NOT NULL, \`token\` varchar(255) NULL, \`role\` varchar(255) NOT NULL DEFAULT 'USER', \`isVerified\` tinyint NOT NULL DEFAULT 0, \`isActive\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`avatar_id\` varchar(36) NULL, UNIQUE INDEX \`REL_c3401836efedec3bec459c8f81\` (\`avatar_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`payment_info\` json NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`courseId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`problem\` text NOT NULL, \`explain\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email\` (\`id\` varchar(36) NOT NULL, \`from\` varchar(255) NULL, \`to\` varchar(255) NOT NULL, \`context\` text NOT NULL, \`subject\` varchar(255) NOT NULL, \`template\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'SUCCEED', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`layout_category\` (\`layout_id\` varchar(36) NOT NULL, \`category_id\` varchar(36) NOT NULL, INDEX \`IDX_aea33c3aa5bd4269e3322dbea8\` (\`layout_id\`), INDEX \`IDX_f752acc8d7a5730144f51c0a21\` (\`category_id\`), PRIMARY KEY (\`layout_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`link\` ADD CONSTRAINT \`FK_2b46d6530029e89c2bb2db3a799\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_7fc7d21773df0b75ea1bd2d4791\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_quiz\` ADD CONSTRAINT \`FK_a69cba15226ae20e369355fa593\` FOREIGN KEY (\`questionId\`) REFERENCES \`question_quiz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD CONSTRAINT \`FK_6a72e1db67c335be0c071cfe1d9\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_quiz\` ADD CONSTRAINT \`FK_22e52cde5b5137ab2898c217825\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course_data\` ADD CONSTRAINT \`FK_6e6ef2cff8da880bb22fb9457bb\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`faq_item\` ADD CONSTRAINT \`FK_9d837a5e5640803ec34fcf7fe9b\` FOREIGN KEY (\`layout_id\`) REFERENCES \`layout\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`layout\` ADD CONSTRAINT \`FK_41b448f8a2c3a715c1ebfc35f75\` FOREIGN KEY (\`banner_image_id\`) REFERENCES \`banner_image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_39231fcb10d7a7ff129ce7e51fc\` FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_c85809dd73f81563e7ff0974609\` FOREIGN KEY (\`curriculum_id\`) REFERENCES \`cloudinary_file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_a96c50a5a085526d834b734ac4f\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f4a3af67ddb294b0f24b59f66b5\` FOREIGN KEY (\`courseDataId\`) REFERENCES \`course_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_73aac6035a70c5f0313c939f237\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learning_progress\` ADD CONSTRAINT \`FK_b9b5fc4bbe202710fdf22234227\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_0cee76f91ee689335c2f57be92f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`register_course\` ADD CONSTRAINT \`FK_116cba53a55ee67201d68197879\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c3401836efedec3bec459c8f818\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`avatar\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_23cc750d9cc6216bc83bf8d6916\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`layout_category\` ADD CONSTRAINT \`FK_aea33c3aa5bd4269e3322dbea81\` FOREIGN KEY (\`layout_id\`) REFERENCES \`layout\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`layout_category\` ADD CONSTRAINT \`FK_f752acc8d7a5730144f51c0a21b\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`layout_category\` DROP FOREIGN KEY \`FK_f752acc8d7a5730144f51c0a21b\``);
        await queryRunner.query(`ALTER TABLE \`layout_category\` DROP FOREIGN KEY \`FK_aea33c3aa5bd4269e3322dbea81\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_23cc750d9cc6216bc83bf8d6916\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c3401836efedec3bec459c8f818\``);
        await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_116cba53a55ee67201d68197879\``);
        await queryRunner.query(`ALTER TABLE \`register_course\` DROP FOREIGN KEY \`FK_0cee76f91ee689335c2f57be92f\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`learning_progress\` DROP FOREIGN KEY \`FK_b9b5fc4bbe202710fdf22234227\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_73aac6035a70c5f0313c939f237\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f4a3af67ddb294b0f24b59f66b5\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_a96c50a5a085526d834b734ac4f\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_c85809dd73f81563e7ff0974609\``);
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_39231fcb10d7a7ff129ce7e51fc\``);
        await queryRunner.query(`ALTER TABLE \`layout\` DROP FOREIGN KEY \`FK_41b448f8a2c3a715c1ebfc35f75\``);
        await queryRunner.query(`ALTER TABLE \`faq_item\` DROP FOREIGN KEY \`FK_9d837a5e5640803ec34fcf7fe9b\``);
        await queryRunner.query(`ALTER TABLE \`course_data\` DROP FOREIGN KEY \`FK_6e6ef2cff8da880bb22fb9457bb\``);
        await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP FOREIGN KEY \`FK_22e52cde5b5137ab2898c217825\``);
        await queryRunner.query(`ALTER TABLE \`question_quiz\` DROP FOREIGN KEY \`FK_6a72e1db67c335be0c071cfe1d9\``);
        await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_a69cba15226ae20e369355fa593\``);
        await queryRunner.query(`ALTER TABLE \`answer_quiz\` DROP FOREIGN KEY \`FK_7fc7d21773df0b75ea1bd2d4791\``);
        await queryRunner.query(`ALTER TABLE \`link\` DROP FOREIGN KEY \`FK_2b46d6530029e89c2bb2db3a799\``);
        await queryRunner.query(`DROP INDEX \`IDX_f752acc8d7a5730144f51c0a21\` ON \`layout_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_aea33c3aa5bd4269e3322dbea8\` ON \`layout_category\``);
        await queryRunner.query(`DROP TABLE \`layout_category\``);
        await queryRunner.query(`DROP TABLE \`email\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`REL_c3401836efedec3bec459c8f81\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`register_course\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`learning_progress\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP INDEX \`REL_c85809dd73f81563e7ff097460\` ON \`course\``);
        await queryRunner.query(`DROP INDEX \`REL_39231fcb10d7a7ff129ce7e51f\` ON \`course\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP TABLE \`layout\``);
        await queryRunner.query(`DROP TABLE \`faq_item\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`banner_image\``);
        await queryRunner.query(`DROP TABLE \`cloudinary_file\``);
        await queryRunner.query(`DROP TABLE \`course_data\``);
        await queryRunner.query(`DROP TABLE \`question_quiz\``);
        await queryRunner.query(`DROP TABLE \`answer_quiz\``);
        await queryRunner.query(`DROP TABLE \`link\``);
        await queryRunner.query(`DROP TABLE \`avatar\``);
    }

}
