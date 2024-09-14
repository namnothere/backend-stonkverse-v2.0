import { Injectable } from '@nestjs/common';

import { CreateNotificationInput, UpdateNotificationInput } from '../dtos';

@Injectable()
export class NotificationService {
  create(input: CreateNotificationInput) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, input: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
