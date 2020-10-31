import {MigrationInterface, QueryRunner} from "typeorm";

export class Class1604015992338 implements MigrationInterface {
    name = 'Class1604015992338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class` DROP FOREIGN KEY `fk_class_class_type1`");
        await queryRunner.query("ALTER TABLE `class` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `class` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `class` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `class` CHANGE `is_grading` `is_grading` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `class` ADD CONSTRAINT `FK_cc9a053d7b479b5f72aa383bfaf` FOREIGN KEY (`class_type_id`) REFERENCES `class_type`(`class_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class` DROP FOREIGN KEY `FK_cc9a053d7b479b5f72aa383bfaf`");
        await queryRunner.query("ALTER TABLE `class` CHANGE `is_grading` `is_grading` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `class` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `class` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `class` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `class` ADD CONSTRAINT `fk_class_class_type1` FOREIGN KEY (`class_type_id`) REFERENCES `class_type`(`class_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
