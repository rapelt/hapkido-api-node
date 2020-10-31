import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn
} from "typeorm";
import {Contact} from "./contact";

@Entity()
export class Family {
    @PrimaryGeneratedColumn({ name: 'family_id'})
    family_id!: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'name'
    })
    name!: string;

    @ManyToOne(() => Contact, contact => contact.id, { nullable: true, eager: true})
    @JoinColumn({ name: "contact_address_id", referencedColumnName: "id" })
    contact_address_id!: Contact

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
