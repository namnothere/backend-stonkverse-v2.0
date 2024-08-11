import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { AnswerQuiz, Course, CourseData, Link, QuestionQuiz } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseData, Link, Comment, QuestionQuiz, AnswerQuiz])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
