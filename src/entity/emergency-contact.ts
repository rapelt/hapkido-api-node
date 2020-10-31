import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class EmergencyContact {
    @PrimaryGeneratedColumn({ name: 'emergency_contact_id'})
    id!: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'name'
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: false,
        name: 'phone_1'
    })
    phone1!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true,
        name: 'phone_2'
    })
    phone2!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
