import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, ManyToMany, JoinTable
} from "typeorm";
import {Grade} from "./grade";
import {TechniqueSet} from "./technique-set";
import {Tag} from "./tag";
import {Media} from "./media";

@Entity()
export class Technique {

    @PrimaryGeneratedColumn({name: 't_id'})
    id!: number;

    @Column({
        type: "varchar",
        length: 200,
        nullable: false,
        unique: false,
        name: 't_title'
    })
    title!: string;

    @Column({
        type: "text",
        nullable: true,
        name: 't_description'
    })
    description!: string;

    @Column({ type: "int", nullable: false })
    t_grade!: number;

    @ManyToOne(() => Grade, grade => grade.id, { nullable: false, eager: true})
    @JoinColumn({ name: "t_grade", referencedColumnName: "id" })
    grade!: Grade

    @Column({ type: "int", nullable: false })
    t_set!: number;

    @ManyToOne(() => TechniqueSet, techniqueSet => techniqueSet.id, { nullable: false, eager: true})
    @JoinColumn({ name: "t_set", referencedColumnName: "id" })
    techniqueSet!: TechniqueSet;

    @ManyToMany(() => Tag, { eager: true})
    @JoinTable({ name: "technique_tag",
        joinColumn: {
            name: "t_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        }})
    tags!: Tag[];

    @ManyToMany(() => Media)
    @JoinTable({ name: "technique_media",
        joinColumn: {
            name: "t_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "m_id",
            referencedColumnName: "id"
        }})
    media!: Media[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
