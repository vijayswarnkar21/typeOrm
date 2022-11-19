import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './contactInfo.entity';
import { Meeting } from './meeting.entity';
import config  from './ormConfig'
import { Task } from './task.entity';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config),
     TypeOrmModule.forFeature([User, Meeting, Task, ContactInfo])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
