import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionLikes1607321409705 implements MigrationInterface {
    name = 'QuestionLikes1607321409705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_957330416d2d30fb6b3ee0b8f80` ON `question_techniques`");
        await queryRunner.query("DROP INDEX `FK_2642a018d14c7aa43b94077af85` ON `question_techniques`");
        await queryRunner.query("DROP INDEX `FK_79b7038b751c62140b88f1f3a21` ON `question_techniques`");
        await queryRunner.query("CREATE TABLE `liked_questions` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `q_id` int NULL, `hb_id` varchar(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `liked_questions` ADD CONSTRAINT `FK_bae701142193b83c777ee22a0c2` FOREIGN KEY (`q_id`) REFERENCES `question_techniques`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `liked_questions` ADD CONSTRAINT `FK_910e9d5870abf38419911713120` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_79b7038b751c62140b88f1f3a21` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_957330416d2d30fb6b3ee0b8f80` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_techniques` ADD CONSTRAINT `FK_2642a018d14c7aa43b94077af85` FOREIGN KEY (`reply_id`) REFERENCES `question_techniques`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_2642a018d14c7aa43b94077af85`");
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_957330416d2d30fb6b3ee0b8f80`");
        await queryRunner.query("ALTER TABLE `question_techniques` DROP FOREIGN KEY `FK_79b7038b751c62140b88f1f3a21`");
        await queryRunner.query("ALTER TABLE `liked_questions` DROP FOREIGN KEY `FK_910e9d5870abf38419911713120`");
        await queryRunner.query("ALTER TABLE `liked_questions` DROP FOREIGN KEY `FK_bae701142193b83c777ee22a0c2`");
        await queryRunner.query("DROP TABLE `liked_questions`");
        await queryRunner.query("CREATE INDEX `FK_79b7038b751c62140b88f1f3a21` ON `question_techniques` (`t_id`)");
        await queryRunner.query("CREATE INDEX `FK_2642a018d14c7aa43b94077af85` ON `question_techniques` (`reply_id`)");
        await queryRunner.query("CREATE INDEX `FK_957330416d2d30fb6b3ee0b8f80` ON `question_techniques` (`hb_id`)");
    }

}
