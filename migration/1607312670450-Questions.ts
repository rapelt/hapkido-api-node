import {MigrationInterface, QueryRunner} from "typeorm";

export class Questions1607312670450 implements MigrationInterface {
    name = 'Questions1607312670450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `question_techniques` (`id` int NOT NULL AUTO_INCREMENT, `question_text` text NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_id` int NULL, `hb_id` varchar(6) NULL, `reply_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_79b7038b751c62140b88f1f3a21` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_957330416d2d30fb6b3ee0b8f80` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_2642a018d14c7aa43b94077af85` FOREIGN KEY (`reply_id`) REFERENCES `question_techniques`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_2642a018d14c7aa43b94077af85`");
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_957330416d2d30fb6b3ee0b8f80`");
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_79b7038b751c62140b88f1f3a21`");
        await queryRunner.query("DROP TABLE `question_techniques`");
    }

}
