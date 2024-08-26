import { Injectable } from '@nestjs/common';

import { CreateRegisterCourseDto } from '../dtos/create-register-course.dto';
import { UpdateRegisterCourseDto } from '../dtos/update-register-course.dto';

@Injectable()
export class RegisterCourseService {
  create(createRegisterCourseDto: CreateRegisterCourseDto) {
    return 'This action adds a new registerCourse';
  }

  findAll() {
    return `This action returns all registerCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registerCourse`;
  }

  update(id: number, updateRegisterCourseDto: UpdateRegisterCourseDto) {
    return `This action updates a #${id} registerCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} registerCourse`;
  }
}
