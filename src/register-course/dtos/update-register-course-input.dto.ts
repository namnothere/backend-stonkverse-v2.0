import { PartialType } from '@nestjs/swagger';

import { CreateRegisterCourseInput } from './create-register-course-input.dto';

export class UpdateRegisterCourseInput extends PartialType(CreateRegisterCourseInput) {}
