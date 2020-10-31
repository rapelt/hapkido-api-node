import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, ManyToMany, JoinTable, PrimaryColumn, Index
} from "typeorm";
import {ClassType} from "./class-type";
import {Member} from "./member";
import {Class} from "./class";
import {Grade} from "./grade";

@Entity('member_grade')
@Index(['hb_id', 'grade_id'], {unique: true})
export class MemberGrade {
    @PrimaryColumn({
        type: 'varchar',
        length: 6
    })
    @ManyToOne(() => Member, member => member.hbId, {cascade: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: 'hbId'})
    public hb_id!: string;

    @ManyToOne(() => Class, aclass => aclass.classId, {cascade: true})
    @JoinColumn({ name: "class_id" })
    public class_id!: number;

    @PrimaryColumn({type: "int"})
    @ManyToOne(() => Grade, grade => grade.id, {cascade: true})
    @JoinColumn({ name: "grade_id", referencedColumnName: 'id'})
    public grade_id!: number;

    @Column({
        type: "datetime",
        nullable: true,
        name: 'date',
    })
    date!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
