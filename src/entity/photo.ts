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
export class Photo {
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
        nullable: false
    })
    url!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    size!: string;

    @ManyToMany(() => Tag)
    @JoinTable({ name: "photo_tag",
        joinColumn: {
            name: "p_id",
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
