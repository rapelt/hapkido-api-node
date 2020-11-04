import {MigrationInterface, QueryRunner} from "typeorm";

export class TechniqueSet1604379910083 implements MigrationInterface {
    name = 'TechniqueSet1604379910083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_46fbf76bbdb372850e89894881` ON `class`");
        await queryRunner.query("DROP INDEX `IDX_0add4cdd0d981761402303e054` ON `technique_set`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_0add4cdd0d981761402303e054` ON `technique_set` (`is_active`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_46fbf76bbdb372850e89894881` ON `class` (`date`)");
    }

}
