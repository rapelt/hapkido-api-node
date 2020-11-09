import {MigrationInterface, QueryRunner} from "typeorm";

export class Media1604542303375 implements MigrationInterface {
    name = 'Media1604542303375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `media` CHANGE `url` `url` varchar(400) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `media` CHANGE `url` `url` varchar(400) NOT NULL");
    }

}
