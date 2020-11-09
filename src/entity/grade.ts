import {
    Entity,
    Column,
    PrimaryColumn, ManyToOne, OneToMany, JoinColumn
} from "typeorm";
import {MemberGrade} from "./member-grade";

@Entity()
export class Grade {
    @PrimaryColumn({ name: 'grade_id', nullable: false})
    id!: number;

    @Column({
        type: "varchar",
        length: 2,
        name: 'short_name'
    })
    shortName!: string;

    @Column({
        type: "varchar",
        length: 20,
        name: 'long_name'
    })
    longName!: string;

    @Column({
        type: "varchar",
        length: 20,
        name: 'css_class'
    })
    cssClass!: string;

    // @OneToMany(() => MemberGrade, member => member.hb_id )
    // @JoinColumn({ name: "hb_id", referencedColumnName: "hb_id" })
    // hb_id!: MemberGrade[];

    @OneToMany(() => MemberGrade, member => member.grade_id)
    @JoinColumn({ name: "grade_id", referencedColumnName: "id" })
    gradings!: MemberGrade[];

}
