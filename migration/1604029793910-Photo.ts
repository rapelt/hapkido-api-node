import {MigrationInterface, QueryRunner} from "typeorm";

export class Photo1604029793910 implements MigrationInterface {
    name = 'Photo1604029793910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `file_name` varchar(200) NOT NULL, `file_type` varchar(200) NULL, `original_file_name` varchar(200) NULL, `folder` varchar(200) NULL, `url` varchar(400) NOT NULL, `size` varchar(20) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `photo`");
    }

}
