import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseData, Link, QuestionQuiz } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CourseData,
      Link,
      Comment,
      QuestionQuiz
    ])
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
