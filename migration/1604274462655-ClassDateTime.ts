import {MigrationInterface, QueryRunner} from "typeorm";

export class ClassDateTime1604274462655 implements MigrationInterface {
    name = 'ClassDateTime1604274462655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class` ADD UNIQUE INDEX `IDX_46fbf76bbdb372850e89894881` (`date`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `class` DROP INDEX `IDX_46fbf76bbdb372850e89894881`");
    }

}
