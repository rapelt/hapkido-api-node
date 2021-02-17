import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn,
} from "typeorm";
import {Member} from "./member";
import {Technique} from "./technique";

@Entity('favourite_techniques')
export class FavouriteTechniques {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Technique, technique => technique.id, { eager: true})
    @JoinColumn({ name: "t_id", referencedColumnName: 'id'})
    public t_id!: number;

    @ManyToOne(() => Member, member => member.hbId, { eager: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: 'hbId' })
    public hb_id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
