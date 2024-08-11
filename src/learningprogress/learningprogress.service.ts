import { Injectable } from '@nestjs/common';

import { CreateLearningprogressDto } from './dtos/create-learningprogress.dto';
import { UpdateLearningprogressDto } from './dtos/update-learningprogress.dto';

@Injectable()
export class LearningprogressService {
  create(createLearningprogressDto: CreateLearningprogressDto) {
    return 'This action adds a new learningprogress';
  }

  findAll() {
    return `This action returns all learningprogress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningprogress`;
  }

  update(id: number, updateLearningprogressDto: UpdateLearningprogressDto) {
    return `This action updates a #${id} learningprogress`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningprogress`;
  }
}
