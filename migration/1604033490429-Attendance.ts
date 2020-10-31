import {MigrationInterface, QueryRunner} from "typeorm";

export class Attendance1604033490429 implements MigrationInterface {
    name = 'Attendance1604033490429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `fk_member_class_class1`");
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `fk_member_class_member1`");
        await queryRunner.query("CREATE INDEX `IDX_73847e8c47d065f9f86125c973` ON `member_class` (`class_id`)");
        await queryRunner.query("CREATE INDEX `IDX_2d0a8f77f1797a5def285aaeb5` ON `member_class` (`hb_id`)");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `FK_73847e8c47d065f9f86125c973b` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `FK_2d0a8f77f1797a5def285aaeb5a` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `FK_2d0a8f77f1797a5def285aaeb5a`");
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `FK_73847e8c47d065f9f86125c973b`");
        await queryRunner.query("DROP INDEX `IDX_2d0a8f77f1797a5def285aaeb5` ON `member_class`");
        await queryRunner.query("DROP INDEX `IDX_73847e8c47d065f9f86125c973` ON `member_class`");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `fk_member_class_member1` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `fk_member_class_class1` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
