import { Expose, Type } from 'class-transformer';

import { CourseOutput } from '../../course/dtos';
import { RegisterCourseOutput } from '../../register-course/dtos';
import { UserProfileOutput } from '../../user/dtos';

export class OrderOutput {
  @Expose()
  courseId: string;

  @Expose()
  payment_info: string;

  @Expose()
  @Type(() => UserProfileOutput)
  user: UserProfileOutput;

  @Expose()
  @Type(() => RegisterCourseOutput)
  registerCourse: RegisterCourseOutput;

  @Expose()
  @Type(() => CourseOutput)
  course: CourseOutput;

  @Expose()
  total: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
