import { Expose, Type } from 'class-transformer';
import { UserProfileOutput } from 'src/user/dtos';

import { QuestionQuizOutput } from './question-quiz-output.dto';
// import { CourseDataOutput } from './course-data-output.dto';
// import { CourseOutput } from './course-output.dto';

export class AnswerQuizOutput {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserProfileOutput)
  user: UserProfileOutput;

  @Expose()
  answer: string;

  @Expose()
  score: number;

  @Expose()
  @Type(() => QuestionQuizOutput)
  question: QuestionQuizOutput;

  constructor(partial: Partial<AnswerQuizOutput>) {
    Object.assign(this, partial);
  }
}
