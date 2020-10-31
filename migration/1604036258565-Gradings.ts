import {MigrationInterface, QueryRunner} from "typeorm";

export class Gradings1604036258565 implements MigrationInterface {
    name = 'Gradings1604036258565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `fk_member_grade_member1`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `fk_member_grade_class1`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `fk_member_grade_grade1`");
        await queryRunner.query("ALTER TABLE `member_grade` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `member_grade` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `member_grade` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_d7485182c66aa8d2c519e291c5` ON `member_grade` (`hb_id`, `grade_id`)");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `FK_91226217a7b220a3bf4b103a628` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `FK_65ab08e765317cf0213ef802915` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `FK_4cffd2e8ce7b0e4564bdddef1e0` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`grade_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `FK_4cffd2e8ce7b0e4564bdddef1e0`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `FK_65ab08e765317cf0213ef802915`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP FOREIGN KEY `FK_91226217a7b220a3bf4b103a628`");
        await queryRunner.query("DROP INDEX `IDX_d7485182c66aa8d2c519e291c5` ON `member_grade`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `member_grade` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `fk_member_grade_grade1` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`grade_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `fk_member_grade_class1` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `member_grade` ADD CONSTRAINT `fk_member_grade_member1` FOREIGN KEY (`hb_id`, `hb_id`) REFERENCES `member`(`hb_id`,`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
