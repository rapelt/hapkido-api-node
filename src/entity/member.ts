import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToMany
} from "typeorm";
import {ClassType} from "./class-type";
import {Moment} from "moment";
import {Family} from "./family";
import {EmergencyContact} from "./emergency-contact";
import {Class} from "./class";
import {Grade} from "./grade";
import {MemberGrade} from "./member-grade";

@Entity()
export class Member {
    @PrimaryColumn({
        name: 'hb_id',
        type: 'varchar',
        length: 6
    })
    hbId!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'first_name',
    })
    firstname!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'last_name',
    })
    lastname!: string;

    @Column({
        type: "datetime",
        nullable: true,
        name: 'dob',
    })
    dob!: Date;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        name: 'occupation',
    })
    occupation!: string;

    @Column({
        type: "boolean",
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive!: boolean;

    @Column({
        type: "boolean",
        nullable: false,
        name: 'is_kumdo_student',
        default: false
    })
    isKumdoStudent!: boolean;

    @Column({
        type: "text",
        nullable: true,
        name: 'previous_experience',
    })
    previousExperience!: string;

    @Column({
        type: "text",
        nullable: true,
        name: 'injury_illness',
    })
    injuryIllness!: string;

    @Column({
        type: "boolean",
        nullable: false,
        name: 'is_verified',
        default: false
    })
    isVerified!: boolean;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: 'email',
    })
    email!: string;

    @Column({ type: "int", nullable: false })
    preferred_class_type_id!: number;

    @ManyToOne(() => ClassType, classType => classType.id, { nullable: false, eager: true})
    @JoinColumn({ name: "preferred_class_type_id", referencedColumnName: "id" })
    preferredClass!: ClassType

    @Column({ type: "int", nullable: false })
    family_id!: number;

    @ManyToOne(() => Family, family => family.family_id, { nullable: false, eager: true})
    @JoinColumn({ name: "family_id", referencedColumnName: "family_id" })
    family!: Family

    @ManyToOne(() => EmergencyContact, emergencyContact => emergencyContact.id, { nullable: true})
    @JoinColumn({ name: "emergency_contact_id", referencedColumnName: "id" })
    emergency_contact_id!: EmergencyContact

    @ManyToMany(() => Class, { cascade: true})
    attendance!: Class[];

    @OneToMany(() => MemberGrade, member => member.hb_id, { eager: true})
    @JoinColumn({ name: "hb_id", referencedColumnName: "hb_id" })
    gradings!: MemberGrade[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
