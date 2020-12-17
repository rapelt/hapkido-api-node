import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, Column, PrimaryColumn,
} from "typeorm";
import {Member} from "./member";
import {Technique} from "./technique";
import {Questions} from "./questions";
import {Class} from "./class";

@Entity('liked_questions')
export class LikedQuestions {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Questions, question => question.id, {cascade: true})
    @JoinColumn({ name: "q_id", referencedColumnName: 'id'})
    public question_id!: Questions;

    @ManyToOne(() => Member, member => member.hbId, {cascade: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: 'hbId' })
    public member!: Member;

    @Column({ type: "string", nullable: false })
    hb_id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
