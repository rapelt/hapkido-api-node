import {MigrationInterface, QueryRunner} from "typeorm";

export class EmailIsNullable1614210471638 implements MigrationInterface {
    name = 'EmailIsNullable1614210471638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` CHANGE `email` `email` varchar(100) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `member` CHANGE `email` `email` varchar(100) NOT NULL");
    }

}
