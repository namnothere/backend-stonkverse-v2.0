import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726471646629 implements MigrationInterface {
    name = 'Migration1726471646629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`status\``);
    }

}
