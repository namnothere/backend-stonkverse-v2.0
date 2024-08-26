import { PartialType } from '@nestjs/mapped-types';

import { CreateCourseInput } from './create-course.dto';

export class UpdateCourseInput extends PartialType(CreateCourseInput) {}
