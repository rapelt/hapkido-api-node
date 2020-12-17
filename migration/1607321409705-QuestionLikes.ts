import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionLikes1607321409705 implements MigrationInterface {
    name = 'QuestionLikes1607321409705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `liked_questions` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `q_id` int NULL, `hb_id` varchar(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `liked_questions`");
    }

}
