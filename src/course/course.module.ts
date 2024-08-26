import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import { AnswerQuiz, Course, CourseData, Link, QuestionQuiz } from './entities';
import * as providers from './providers';
import { CloudinaryModule } from '../cloudinary';
import { CloudinaryFile } from '../cloudinary/entities';
import { Comment } from '../comment/entities';
import { Notification } from '../notification/entities';
import { RegisterCourse } from '../register-course/entities';
import { User } from '../user/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CourseData,
      Link,
      Comment,
      QuestionQuiz,
      AnswerQuiz,
      User,
      Notification,
      RegisterCourse,
      CloudinaryFile,
    ]),
    CloudinaryModule,
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class CourseModule {}
