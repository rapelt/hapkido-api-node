import {MigrationInterface, QueryRunner} from "typeorm";

export class ClassType1604011625943 implements MigrationInterface {
    name = 'ClassType1604011625943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class_type` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `class_type` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `class_type` ADD `deletedAt` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class_type` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `class_type` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `class_type` DROP COLUMN `createdAt`");
    }

}
