import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class TechniqueSet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: true
    })
    name!: string;

    @Column({
        type: "boolean",
        nullable: false,
        unique: true,
        default: true,
        name: 'is_active'
    })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
