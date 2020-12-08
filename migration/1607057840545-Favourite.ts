import {MigrationInterface, QueryRunner} from "typeorm";

export class Favourite1607057840545 implements MigrationInterface {
    name = 'Favourite1607057840545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `favourite_techniques` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `t_id` int NULL, `hb_id` varchar(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `favourite_techniques` ADD CONSTRAINT `FK_cce4775fcf023ed3d1993567855` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favourite_techniques` ADD CONSTRAINT `FK_7b1cfccbaf69e406d1cfec047b4` FOREIGN KEY (`hb_id`) REFERENCES `member`(`hb_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `favourite_techniques` DROP FOREIGN KEY `FK_7b1cfccbaf69e406d1cfec047b4`");
        await queryRunner.query("ALTER TABLE `favourite_techniques` DROP FOREIGN KEY `FK_cce4775fcf023ed3d1993567855`");
        await queryRunner.query("DROP TABLE `favourite_techniques`");
    }

}
