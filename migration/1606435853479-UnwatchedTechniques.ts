import {MigrationInterface, QueryRunner} from "typeorm";

export class UnwatchedTechniques1606435853479 implements MigrationInterface {
    name = 'UnwatchedTechniques1606435853479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `unwatched_techniques` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_id` int NULL, `hb_id` varchar(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `unwatched_techniques`");
    }

}
