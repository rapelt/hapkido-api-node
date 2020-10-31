import {MigrationInterface, QueryRunner} from "typeorm";

export class Media1604037158336 implements MigrationInterface {
    name = 'Media1604037158336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `technique_photo` (`t_id` int NOT NULL, `p_id` int NOT NULL, INDEX `IDX_c1ae6c734289e5d71e5198c381` (`t_id`), INDEX `IDX_6c904df35b2aff20c7ea214def` (`p_id`), PRIMARY KEY (`t_id`, `p_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `technique_video` (`t_id` int NOT NULL, `v_id` int NOT NULL, INDEX `IDX_bfeca42e16c620ad79f0860ef5` (`t_id`), INDEX `IDX_2da0028def0f3d482992f7705b` (`v_id`), PRIMARY KEY (`t_id`, `v_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `technique_photo` ADD CONSTRAINT `FK_c1ae6c734289e5d71e5198c3811` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_photo` ADD CONSTRAINT `FK_6c904df35b2aff20c7ea214def6` FOREIGN KEY (`p_id`) REFERENCES `photo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_video` ADD CONSTRAINT `FK_bfeca42e16c620ad79f0860ef5c` FOREIGN KEY (`t_id`) REFERENCES `technique`(`t_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technique_video` ADD CONSTRAINT `FK_2da0028def0f3d482992f7705be` FOREIGN KEY (`v_id`) REFERENCES `video`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `technique_video` DROP FOREIGN KEY `FK_2da0028def0f3d482992f7705be`");
        await queryRunner.query("ALTER TABLE `technique_video` DROP FOREIGN KEY `FK_bfeca42e16c620ad79f0860ef5c`");
        await queryRunner.query("ALTER TABLE `technique_photo` DROP FOREIGN KEY `FK_6c904df35b2aff20c7ea214def6`");
        await queryRunner.query("ALTER TABLE `technique_photo` DROP FOREIGN KEY `FK_c1ae6c734289e5d71e5198c3811`");
        await queryRunner.query("DROP INDEX `IDX_2da0028def0f3d482992f7705b` ON `technique_video`");
        await queryRunner.query("DROP INDEX `IDX_bfeca42e16c620ad79f0860ef5` ON `technique_video`");
        await queryRunner.query("DROP TABLE `technique_video`");
        await queryRunner.query("DROP INDEX `IDX_6c904df35b2aff20c7ea214def` ON `technique_photo`");
        await queryRunner.query("DROP INDEX `IDX_c1ae6c734289e5d71e5198c381` ON `technique_photo`");
        await queryRunner.query("DROP TABLE `technique_photo`");
    }

}
