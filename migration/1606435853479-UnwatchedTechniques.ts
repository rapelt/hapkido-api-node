import {MigrationInterface, QueryRunner} from "typeorm";

export class UnwatchedTechniques1606435853479 implements MigrationInterface {
    name = 'UnwatchedTechniques1606435853479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `unwatched_techniques` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_id` int NULL, `hb_id` varchar(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `unwatched_techniques` ADD CONSTRAINT `FK_d83497f7e374e3d0293d629319f` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `unwatched_techniques` ADD CONSTRAINT `FK_8101d2fe00519df31d4889282ef` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unwatched_techniques` DROP FOREIGN KEY `FK_8101d2fe00519df31d4889282ef`");
        await queryRunner.query("ALTER TABLE `unwatched_techniques` DROP FOREIGN KEY `FK_d83497f7e374e3d0293d629319f`");
        await queryRunner.query("DROP TABLE `unwatched_techniques`");
    }

}
