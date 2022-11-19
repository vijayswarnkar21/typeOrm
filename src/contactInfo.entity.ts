import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ContactInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    phone: string;

    @Column()
    email: string;

    // So normally we keep both 

    @Column()
    userId: number

    @OneToOne(() => User, user => user.contactInfo, {onDelete: 'CASCADE'})
    // To let the ORM know, where is the relationaship id created
    @JoinColumn()
    user: User

}