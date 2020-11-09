import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn({ name: 'address_id'})
    id!: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'street_1'
    })
    street1!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        name: 'street_2'
    })
    street2!: string;

    @Column({
        type: "varchar",
        length: 4,
        nullable: false,
        name: 'postcode'
    })
    postcode!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'suburb'
    })
    suburb!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: false,
        name: 'phone_number'
    })
    phoneNumber!: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: false,
        name: 'state'
    })
    state!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
