import {MigrationInterface, QueryRunner} from "typeorm";

export class Tags1604036831651 implements MigrationInterface {
    name = 'Tags1604036831651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("set foreign_key_checks=0");
        await queryRunner.query("CREATE TABLE `photo_tag` (`p_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_f1d67144bf277b884aa0c981ea` (`p_id`), INDEX `IDX_2aa3561c4258a620412a9e0c3e` (`tag_id`), PRIMARY KEY (`p_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `technique_tag` (`t_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_53b161f688ba2193fa2593cacb` (`t_id`), INDEX `IDX_bee6481ef4988f57cd4ac6d7f9` (`tag_id`), PRIMARY KEY (`t_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `video_tag` (`v_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_ff12c4716e7c2c19aa28f961b0` (`v_id`), INDEX `IDX_8a3ae3a8fee0382ac5874da0a2` (`tag_id`), PRIMARY KEY (`v_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `photo_tag` ADD CONSTRAINT `FK_f1d67144bf277b884aa0c981ea2` FOREIGN KEY (`p_id`) REFERENCES `photo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `photo_tag` ADD CONSTRAINT `FK_2aa3561c4258a620412a9e0c3ef` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_tag` ADD CONSTRAINT `FK_53b161f688ba2193fa2593cacbc` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_tag` ADD CONSTRAINT `FK_bee6481ef4988f57cd4ac6d7f9a` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `video_tag` ADD CONSTRAINT `FK_ff12c4716e7c2c19aa28f961b0f` FOREIGN KEY (`v_id`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `video_tag` ADD CONSTRAINT `FK_8a3ae3a8fee0382ac5874da0a22` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `video_tag` DROP FOREIGN KEY `FK_8a3ae3a8fee0382ac5874da0a22`");
        await queryRunner.query("ALTER TABLE `video_tag` DROP FOREIGN KEY `FK_ff12c4716e7c2c19aa28f961b0f`");
        await queryRunner.query("ALTER TABLE `technique_tag` DROP FOREIGN KEY `FK_bee6481ef4988f57cd4ac6d7f9a`");
        await queryRunner.query("ALTER TABLE `technique_tag` DROP FOREIGN KEY `FK_53b161f688ba2193fa2593cacbc`");
        await queryRunner.query("ALTER TABLE `photo_tag` DROP FOREIGN KEY `FK_2aa3561c4258a620412a9e0c3ef`");
        await queryRunner.query("ALTER TABLE `photo_tag` DROP FOREIGN KEY `FK_f1d67144bf277b884aa0c981ea2`");
        await queryRunner.query("DROP INDEX `IDX_8a3ae3a8fee0382ac5874da0a2` ON `video_tag`");
        await queryRunner.query("DROP INDEX `IDX_ff12c4716e7c2c19aa28f961b0` ON `video_tag`");
        await queryRunner.query("DROP TABLE `video_tag`");
        await queryRunner.query("DROP INDEX `IDX_bee6481ef4988f57cd4ac6d7f9` ON `technique_tag`");
        await queryRunner.query("DROP INDEX `IDX_53b161f688ba2193fa2593cacb` ON `technique_tag`");
        await queryRunner.query("DROP TABLE `technique_tag`");
        await queryRunner.query("DROP INDEX `IDX_2aa3561c4258a620412a9e0c3e` ON `photo_tag`");
        await queryRunner.query("DROP INDEX `IDX_f1d67144bf277b884aa0c981ea` ON `photo_tag`");
        await queryRunner.query("DROP TABLE `photo_tag`");
    }

}
