import {MigrationInterface, QueryRunner} from "typeorm";

export class ClassMember1604189855159 implements MigrationInterface {
    name = 'ClassMember1604189855159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_26561d0013219aa074c1dbcba1` ON `member_class` (`hb_id`, `class_id`)");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `FK_2d0a8f77f1797a5def285aaeb5a` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `member_class` ADD CONSTRAINT `FK_73847e8c47d065f9f86125c973b` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `FK_73847e8c47d065f9f86125c973b`");
        await queryRunner.query("ALTER TABLE `member_class` DROP FOREIGN KEY `FK_2d0a8f77f1797a5def285aaeb5a`");
        await queryRunner.query("DROP INDEX `IDX_26561d0013219aa074c1dbcba1` ON `member_class`");
    }

}
