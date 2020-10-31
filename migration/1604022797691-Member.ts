import {MigrationInterface, QueryRunner} from "typeorm";

export class Member1604022797691 implements MigrationInterface {
    name = 'Member1604022797691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `fk_member_class_type1`");
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `fk_member_emergency_contact1`");
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `fk_member_family1`");
        await queryRunner.query("ALTER TABLE `member` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `member` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `member` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_active` `is_active` tinyint NOT NULL DEFAULT 1");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_kumdo_student` `is_kumdo_student` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_verified` `is_verified` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `FK_9ffbf1989922b3e7faea640372f` FOREIGN KEY (`preferred_class_type_id`) REFERENCES `class_type`(`class_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `FK_615c5d82207a6ccf6e1b3011091` FOREIGN KEY (`family_id`) REFERENCES `family`(`family_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `FK_120644abd4b9722a998e1b26a43` FOREIGN KEY (`emergency_contact_id`) REFERENCES `emergency_contact`(`emergency_contact_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `FK_120644abd4b9722a998e1b26a43`");
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `FK_615c5d82207a6ccf6e1b3011091`");
        await queryRunner.query("ALTER TABLE `member` DROP FOREIGN KEY `FK_9ffbf1989922b3e7faea640372f`");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_verified` `is_verified` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_kumdo_student` `is_kumdo_student` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `member` CHANGE `is_active` `is_active` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `member` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `fk_member_family1` FOREIGN KEY (`family_id`) REFERENCES `family`(`family_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `fk_member_emergency_contact1` FOREIGN KEY (`emergency_contact_id`) REFERENCES `emergency_contact`(`emergency_contact_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `member` ADD CONSTRAINT `fk_member_class_type1` FOREIGN KEY (`preferred_class_type_id`) REFERENCES `class_type`(`class_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
