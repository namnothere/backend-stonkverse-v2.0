import { Expose, Type } from 'class-transformer';

import { CourseOutput } from '../../course/dtos';
import { UserProfileOutput } from '../../user/dtos';

export class RegisterCourseOutput {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserProfileOutput)
  user: UserProfileOutput;

  @Expose()
  @Type(() => CourseOutput)
  course: CourseOutput;
}
