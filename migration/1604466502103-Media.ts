import {MigrationInterface, QueryRunner} from "typeorm";

export class Media1604466502103 implements MigrationInterface {
    name = 'Media1604466502103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `media` (`id` int NOT NULL AUTO_INCREMENT, `file_name` varchar(200) NOT NULL, `file_type` varchar(200) NULL, `original_file_name` varchar(200) NULL, `folder` varchar(200) NULL, `url` varchar(400) NOT NULL, `size` varchar(20) NULL, `upload_status` varchar(20) NULL, `published_status` varchar(20) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `media_tag` (`m_id` int NOT NULL, `tag_id` int NOT NULL, INDEX `IDX_38b202884028d472812982f3aa` (`m_id`), INDEX `IDX_99a0ad88691ff4c8e460d96115` (`tag_id`), PRIMARY KEY (`m_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `technique_media` (`t_id` int NOT NULL, `m_id` int NOT NULL, INDEX `IDX_bb47cff62e8bd6213431438ac7` (`t_id`), INDEX `IDX_b0a4aa23de7b260d426a8dc8ee` (`m_id`), PRIMARY KEY (`t_id`, `m_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `media_tag` ADD CONSTRAINT `FK_38b202884028d472812982f3aa2` FOREIGN KEY (`m_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `media_tag` ADD CONSTRAINT `FK_99a0ad88691ff4c8e460d961154` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_media` ADD CONSTRAINT `FK_bb47cff62e8bd6213431438ac77` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_media` ADD CONSTRAINT `FK_b0a4aa23de7b260d426a8dc8ee4` FOREIGN KEY (`m_id`) REFERENCES `media`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `technique_media` DROP FOREIGN KEY `FK_b0a4aa23de7b260d426a8dc8ee4`");
        await queryRunner.query("ALTER TABLE `technique_media` DROP FOREIGN KEY `FK_bb47cff62e8bd6213431438ac77`");
        await queryRunner.query("ALTER TABLE `media_tag` DROP FOREIGN KEY `FK_99a0ad88691ff4c8e460d961154`");
        await queryRunner.query("ALTER TABLE `media_tag` DROP FOREIGN KEY `FK_38b202884028d472812982f3aa2`");
        await queryRunner.query("DROP INDEX `IDX_b0a4aa23de7b260d426a8dc8ee` ON `technique_media`");
        await queryRunner.query("DROP INDEX `IDX_bb47cff62e8bd6213431438ac7` ON `technique_media`");
        await queryRunner.query("DROP TABLE `technique_media`");
        await queryRunner.query("DROP INDEX `IDX_99a0ad88691ff4c8e460d96115` ON `media_tag`");
        await queryRunner.query("DROP INDEX `IDX_38b202884028d472812982f3aa` ON `media_tag`");
        await queryRunner.query("DROP TABLE `media_tag`");
        await queryRunner.query("DROP TABLE `media`");
    }

}
