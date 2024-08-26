import { Expose } from 'class-transformer';
// import { CourseDataOutput } from './course-data-output.dto';
// import { CourseOutput } from './course-output.dto';

export class QuestionQuizOutput {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  correctAnswers: string;

  // @Expose()
  // @Type(() => CourseDataOutput)
  // courseData: CourseDataOutput;

  // @Expose()
  // @Type(() => CourseOutput)
  // course: CourseOutput;

  @Expose()
  maxScore: number;

  constructor(partial: Partial<QuestionQuizOutput>) {
    Object.assign(this, partial);
  }
}
