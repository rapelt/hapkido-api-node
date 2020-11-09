import {MigrationInterface, QueryRunner} from "typeorm";

export class Family1604020689941 implements MigrationInterface {
    name = 'Family1604020689941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `family` DROP FOREIGN KEY `fk_family_contact1`");
        await queryRunner.query("ALTER TABLE `family` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `family` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `family` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `family` ADD CONSTRAINT `FK_cea7aa6bd7e8c5dff4b1d73f4c3` FOREIGN KEY (`contact_address_id`) REFERENCES `contact`(`address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `family` DROP FOREIGN KEY `FK_cea7aa6bd7e8c5dff4b1d73f4c3`");
        await queryRunner.query("ALTER TABLE `family` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `family` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `family` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `family` ADD CONSTRAINT `fk_family_contact1` FOREIGN KEY (`contact_address_id`) REFERENCES `contact`(`address_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
