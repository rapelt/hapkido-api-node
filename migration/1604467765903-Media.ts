import {MigrationInterface, QueryRunner} from "typeorm";

export class Media1604467765903 implements MigrationInterface {
    name = 'Media1604467765903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `media` ADD `views` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `media` DROP COLUMN `views`");
    }

}
