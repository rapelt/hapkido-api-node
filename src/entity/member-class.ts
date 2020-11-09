import {
    Entity,
    ManyToOne, JoinColumn, PrimaryColumn, Index
} from "typeorm";
import {Member} from "./member";
import {Class} from "./class";

@Entity('member_class')
@Index(['hb_id', 'class_id'], {unique: true})
export class MemberClass {
    @PrimaryColumn({
        type: 'varchar',
        length: 6,
    })
    @ManyToOne(() => Member, member => member.hbId, {cascade: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: 'hbId'})
    public hb_id!: string;

    @PrimaryColumn({type: "int"})
    @ManyToOne(() => Class, aclass => aclass.classId, {cascade: true})
    @JoinColumn({ name: "class_id", referencedColumnName: 'classId' })
    public class_id!: number;
}
