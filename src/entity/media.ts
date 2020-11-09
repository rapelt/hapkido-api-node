import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany, JoinTable
} from "typeorm";
import {Tag} from "./tag";
import {Member} from "./member";

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 200,
        nullable: false
    })
    file_name!: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
    })
    file_type!: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
    })
    original_file_name!: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
    })
    folder!: string;

    @Column({
        type: "varchar",
        length: 400,
        nullable: true
    })
    url!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    size!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        name: 'upload_status'
    })
    uploadStatus!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        name: 'published_status'

    })
    publishedStatus!: string;

    @Column({
        type: "int",
        nullable: true,
        name: 'views'
    })
    views!: number;

    @ManyToMany(() => Tag)
    @JoinTable({ name: "media_tag",
        joinColumn: {
            name: "m_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        }})
    tags!: Tag[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
