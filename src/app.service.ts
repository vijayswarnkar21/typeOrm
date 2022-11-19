import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contactInfo.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>
  ) { }

  async seed() {
    const ceo = this.userRepo.create({ name: "swarnkar" })
    await this.userRepo.save(ceo)

    // This is also correct
    // const ceoContactInfo = this.contactInfoRepo.create(
    // {
    //   email: "vijay@gmail.com",
    //     userId: ceo.id
    // })
    const ceoContactInfo = this.contactInfoRepo.create({ email: "vijay@gmail.com"})
    ceoContactInfo.user = ceo
    await this.contactInfoRepo.save(ceoContactInfo)

    const manager = this.userRepo.create({name: "Bhosad pappu", manager: ceo})

    const task1 = this.taskRepo.create({ name : "abc"})
    await this.taskRepo.save(task1)
    const task2 = this.taskRepo.create({ name : "xyz"})
    await this.taskRepo.save(task2)

    manager.tasks = [task1,task2];

    //here manager will get created and corrsponding task 
    // will get updated with manager's id 

    const meeting1 = this.meetingRepo.create({zoomUrl: "meeting.com"})
    meeting1.participants = [ceo]
    await this.meetingRepo.save(meeting1)

    manager.meetings = [meeting1];
    console.log(manager.meetings)
    await this.userRepo.save(manager)
  }

  getHello(): string {
    return 'Hello World!';
  }
}
