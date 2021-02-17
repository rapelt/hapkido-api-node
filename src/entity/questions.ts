import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, Column, OneToMany,
} from "typeorm";
import {Member} from "./member";
import {Technique} from "./technique";
import {LikedQuestions} from "./question-likes";
import {MemberClass} from "./member-class";

@Entity('question_techniques')
export class Questions {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int", nullable: false })
    t_id!: number;

    @ManyToOne(() => Technique, technique => technique.id, {cascade: true, eager: false})
    @JoinColumn({ name: "t_id", referencedColumnName: 'id'})
    public technique!: Technique;

    @ManyToOne(() => Member, member => member.hbId, {cascade: true, eager: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: 'hbId' })
    public hbId!: Member;

    @Column({ type: "string", nullable: false })
    hb_id!: string;

    @ManyToOne(() => Questions, question => question.id, {nullable: true})
    @JoinColumn({ name: "reply_id", referencedColumnName: 'id' })
    public reply!: Questions;

    @OneToMany(() => LikedQuestions, lq => lq.question_id, { eager: true})
    @JoinColumn({ name: "q_id", referencedColumnName: "likes" })
    likes!: LikedQuestions[];

    @Column({ type: "int", nullable: true })
    reply_id!: number | null;

    @Column({
        type: "text",
        name: 'question_text'
    })
    question_text!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
