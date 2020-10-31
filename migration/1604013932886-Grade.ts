import {MigrationInterface, QueryRunner} from "typeorm";

export class Grade1604013932886 implements MigrationInterface {
    name = 'Grade1604013932886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grade` CHANGE `short_name` `short_name` varchar(2) NOT NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `long_name` `long_name` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `css_class` `css_class` varchar(20) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `grade` CHANGE `css_class` `css_class` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `long_name` `long_name` varchar(20) NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `short_name` `short_name` varchar(2) NULL");
    }

}
