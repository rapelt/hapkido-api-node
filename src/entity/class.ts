import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, ManyToMany, JoinTable
} from "typeorm";
import {ClassType} from "./class-type";
import {Member} from "./member";
import {MemberGrade} from "./member-grade";

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
    })
    date!: Date;

    @ManyToOne(() => ClassType, classType => classType.id, { nullable: false, eager: true})
    @JoinColumn({ name: "class_type_id", referencedColumnName: "id" })
    classType!: ClassType

    @ManyToMany(() => Member, { cascade: true})
    @JoinTable({ name: "member_class",
        joinColumn: {
            name: "class_id",
            referencedColumnName: "classId"
        },
        inverseJoinColumn: {
            name: "hb_id",
            referencedColumnName: "hbId"
        }})
    attendance!: Member[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
