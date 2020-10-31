import {MigrationInterface, QueryRunner} from "typeorm";

export class Technique1604031003611 implements MigrationInterface {
    name = 'Technique1604031003611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("set foreign_key_checks=0");
        await queryRunner.query("CREATE TABLE `technique` (`t_id` int NOT NULL AUTO_INCREMENT, `t_title` varchar(200) NOT NULL, `t_description` text NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_grade` int NOT NULL, `t_set` int NOT NULL, PRIMARY KEY (`t_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `technique` ADD CONSTRAINT `FK_b371035ad51af0f3d6a63715035` FOREIGN KEY (`t_grade`) REFERENCES `grade`(`grade_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique` ADD CONSTRAINT `FK_9a14afba7d8f71b7f2cc44864df` FOREIGN KEY (`t_set`) REFERENCES `technique_set`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `technique` DROP FOREIGN KEY `FK_9a14afba7d8f71b7f2cc44864df`");
        await queryRunner.query("ALTER TABLE `technique` DROP FOREIGN KEY `FK_b371035ad51af0f3d6a63715035`");
        await queryRunner.query("DROP TABLE `technique`");
    }
}
