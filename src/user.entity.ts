import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contactInfo.entity";
import { Meeting } from "./meeting.entity";
import { Task } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //self referencing
    @OneToOne(() => User, user => user.directReports, {onDelete: 'SET NULL'})
    @JoinColumn()
    manager: User

    @OneToMany(() => User, user => user.manager)
    directReports: User[]

    @OneToOne(() => ContactInfo, contactInfo => contactInfo.user)
    contactInfo: ContactInfo

    @OneToMany(() => Task, tasks => tasks.user)
    tasks: Task[]


    // JoinTable decorator should be on owning side of the relation
    // if we see here, User owns a meeting

    // in case of many to many relationaship cascading is implicitely 
    // means if user get deleted correspionding entry in join table will get deleted
    // in the same way if a meeting get deleted correspionding entry in join table will get deleted
    @ManyToMany(() => Meeting, meetings => meetings.participants)
    @JoinTable()
    meetings: Meeting[]
}