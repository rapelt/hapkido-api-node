import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class ClassType {
    @PrimaryGeneratedColumn({ name: 'class_type_id'})
    id!: number;

    @Column({
        type: "varchar",
        length: 45,
        nullable: false,
        name: 'class_type'
    })
    classType!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
