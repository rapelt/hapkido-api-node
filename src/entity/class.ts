import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany
} from "typeorm";
import {ClassType} from "./class-type";
import {MemberClass} from "./member-class";

@Entity()
export class Class {
    @PrimaryGeneratedColumn({ name: 'class_id'})
    classId!: number;

    @Column({
        type: "boolean",
        nullable: false,
        name: 'is_grading',
        default: false
    })
    isGrading!: boolean;

    @Column({
        type: "datetime",
        nullable: false,
        name: 'date',
        unique: true
    })
    date!: Date;

    @ManyToOne(() => ClassType, classType => classType.id, { nullable: false, eager: true})
    @JoinColumn({ name: "class_type_id", referencedColumnName: "id" })
    classType!: ClassType

    @OneToMany(() => MemberClass, aclass => aclass.class_id, { eager: true})
    @JoinColumn({ name: "class_id", referencedColumnName: "classId" })
    attendance!: MemberClass[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
