import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { UserProfileOutput } from '../dtos';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getProfile(userId: string): Promise<UserProfileOutput> {
    const user = this.userRepo.findOne({
      where: { id: userId },
    });

    return plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUser(username: string) {
    return this.userRepo.findOne({
      where: { name: username },
    });
  }
}
