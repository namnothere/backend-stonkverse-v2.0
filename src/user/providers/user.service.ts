import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { UserProfileOutput, UserUpdateProfileInput } from '../dtos';
import { Avatar, User } from '../entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { CloudinaryService } from '../../cloudinary/providers';
import { BaseApiResponse } from 'src/shared/dtos';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Avatar)
    private avatarRepo: Repository<Avatar>,
    private cloudinaryService: CloudinaryService
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

  async updateUserProfile(userId: string, input: UserUpdateProfileInput): Promise<BaseApiResponse<UserProfileOutput>> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['avatar'] });
    const updated: any = {};

    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    if (input.avatar) {
      if (user.avatar.public_id) {
        await this.cloudinaryService.destroy(user.avatar.public_id);
      }
      const myCloud = await this.cloudinaryService.upload(input.avatar, {
        folder: 'avatars',
        width: 150,
      });
      const avatar = new Avatar({
        user
      });

      avatar.public_id = myCloud.public_id;
      avatar.url = myCloud.secure_url;
      await this.avatarRepo.save(avatar);

      user.avatar = avatar;
      await this.userRepo.save(user);
    }

    if (input.name) {
      user.name = input.name;
      // await this.userRepo.update({ id: userId }, { name: input.name });
      updated.name = input.name;
    }

    if (input.oldPassword && input.newPassword) {
      const match = await compare(input.oldPassword, user.password);
      if (!match) {
        throw new BadRequestException(MESSAGES.INCORRECT_PASSWORD);
      }
      user.password = hash(input.newPassword);
      // await this.userRepo.update({ id: userId }, { password: input.newPassword });
      updated.password = hash(input.newPassword);
    }

    await this.userRepo.update({ id: userId }, {
      ...updated
    });

    const output = plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
      status: RESULT_STATUS.SUCCEED,
    }
  }
}
