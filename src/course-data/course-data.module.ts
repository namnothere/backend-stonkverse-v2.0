import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseDataController } from './controllers/course-data.controller';
import { CourseData } from './entities';
import { CourseDataService } from './providers/course-data.service';
import { Comment } from '../comment/entities';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseData, User, Comment])],
  controllers: [CourseDataController],
  providers: [CourseDataService],
})
export class CourseDataModule {}
