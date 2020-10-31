import {MigrationInterface, QueryRunner} from "typeorm";

export class Contact1604013266179 implements MigrationInterface {
    name = 'Contact1604013266179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `contact` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `contact` ADD `deletedAt` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `contact` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `contact` DROP COLUMN `createdAt`");
    }

}
