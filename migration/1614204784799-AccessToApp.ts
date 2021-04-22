import {MigrationInterface, QueryRunner} from "typeorm";

export class AccessToApp1614204784799 implements MigrationInterface {
    name = 'AccessToApp1614204784799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` ADD `has_app_login` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `member` ADD `is_enabled_in_app` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `is_enabled_in_app`");
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `has_app_login`");
    }

}
