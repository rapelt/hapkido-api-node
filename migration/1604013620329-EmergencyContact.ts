import {MigrationInterface, QueryRunner} from "typeorm";

export class EmergencyContact1604013620329 implements MigrationInterface {
    name = 'EmergencyContact1604013620329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `emergency_contact` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `emergency_contact` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `emergency_contact` ADD `deletedAt` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `emergency_contact` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `emergency_contact` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `emergency_contact` DROP COLUMN `createdAt`");
    }

}
