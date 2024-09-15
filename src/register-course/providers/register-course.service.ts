import { Injectable } from '@nestjs/common';

import { CreateRegisterCourseInput, UpdateRegisterCourseInput } from '../dtos';

@Injectable()
export class RegisterCourseService {
  create(input: CreateRegisterCourseInput) {
    return 'This action adds a new registerCourse';
  }

  findAll() {
    return `This action returns all registerCourse`;
  }

  findOne(id: string) {
    return `This action returns a #${id} registerCourse`;
  }

  update(id: string, input: UpdateRegisterCourseInput) {
    return `This action updates a #${id} registerCourse`;
  }

  remove(id: string) {
    return `This action removes a #${id} registerCourse`;
  }
}
