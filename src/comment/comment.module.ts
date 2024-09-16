import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { Comment } from './entities';
import * as providers from './providers';
import { CourseData } from '../course-data/entities';
import { User } from '../user/entities';
import { RegisterCourse } from '../register-course/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, CourseData, RegisterCourse])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class CommentModule {}
