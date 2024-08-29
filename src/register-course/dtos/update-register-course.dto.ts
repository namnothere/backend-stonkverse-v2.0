import { PartialType } from '@nestjs/swagger';

import { CreateRegisterCourseDto } from './create-register-course.dto';

export class UpdateRegisterCourseDto extends PartialType(CreateRegisterCourseDto) {}
