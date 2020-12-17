import {MigrationInterface, QueryRunner} from "typeorm";

export class Questions1607312670450 implements MigrationInterface {
    name = 'Questions1607312670450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `question_techniques` (`id` int NOT NULL AUTO_INCREMENT, `question_text` text NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_id` int NULL, `hb_id` varchar(6) NULL, `reply_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `question_techniques`");
    }

}
