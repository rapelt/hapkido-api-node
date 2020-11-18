import {MigrationInterface, QueryRunner} from "typeorm";

export class TagColour1605587854583 implements MigrationInterface {
    name = 'TagColour1605587854583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tag` ADD `colour` varchar(40) NOT NULL DEFAULT '#104EA3'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tag` DROP COLUMN `colour`");
    }

}
