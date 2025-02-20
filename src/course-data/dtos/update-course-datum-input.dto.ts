import { PartialType } from '@nestjs/swagger';

import { CreateCourseDatumInput } from './create-course-datum-input.dto';

export class UpdateCourseDatumInput extends PartialType(CreateCourseDatumInput) {}
