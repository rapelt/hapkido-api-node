import {MigrationInterface, QueryRunner} from "typeorm";

export class TechniqueSet1604030049881 implements MigrationInterface {
    name = 'TechniqueSet1604030049881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `technique_set` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(200) NOT NULL, `is_active` tinyint NOT NULL DEFAULT 1, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_7eaaf667e15a0342286c9738c1` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_7eaaf667e15a0342286c9738c1` ON `technique_set`");
        await queryRunner.query("DROP TABLE `technique_set`");
    }

}
