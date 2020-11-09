import {MigrationInterface, QueryRunner} from "typeorm";

export class Tags1604036831651 implements MigrationInterface {
    name = 'Tags1604036831651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("set foreign_key_checks=0");
        await queryRunner.query("CREATE TABLE `technique_tag` (`t_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_53b161f688ba2193fa2593cacb` (`t_id`), INDEX `IDX_bee6481ef4988f57cd4ac6d7f9` (`tag_id`), PRIMARY KEY (`t_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `technique_tag` ADD CONSTRAINT `FK_53b161f688ba2193fa2593cacbc` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_tag` ADD CONSTRAINT `FK_bee6481ef4988f57cd4ac6d7f9a` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `technique_tag` DROP FOREIGN KEY `FK_bee6481ef4988f57cd4ac6d7f9a`");
        await queryRunner.query("ALTER TABLE `technique_tag` DROP FOREIGN KEY `FK_53b161f688ba2193fa2593cacbc`");
        await queryRunner.query("DROP INDEX `IDX_bee6481ef4988f57cd4ac6d7f9` ON `technique_tag`");
        await queryRunner.query("DROP INDEX `IDX_53b161f688ba2193fa2593cacb` ON `technique_tag`");
        await queryRunner.query("DROP TABLE `technique_tag`");
    }

}
