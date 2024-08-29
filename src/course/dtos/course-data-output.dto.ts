import { Expose, Type } from 'class-transformer';

import { CourseOutput } from './course-output.dto';
import { LinkOutput } from './link-output.dto';
import { QuestionQuizOutput } from './question-quiz-output.dto';
import { CommentOutput } from '../../comment/dtos';

export class CourseDataOutput {
  @Expose()
  id: string;

  @Expose()
  @Type(() => CourseOutput) // Assuming you have a CourseDto
  course?: CourseOutput;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  videoUrl?: string;

  @Expose()
  @Type(() => LinkOutput)
  links: LinkOutput[];

  @Expose()
  @Type(() => CommentOutput)
  comments: CommentOutput[];

  @Expose()
  @Type(() => QuestionQuizOutput)
  quizzes: QuestionQuizOutput[];

  constructor(partial: Partial<CourseDataOutput>) {
    Object.assign(this, partial);
  }
}
