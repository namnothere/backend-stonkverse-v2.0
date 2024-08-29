import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { BaseApiResponse, BasePaginationResponse } from 'src/shared/dtos';
import { ILike, Repository } from 'typeorm';

import { CloudinaryService } from '../../cloudinary/providers';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { UserProfileOutput, UserUpdateProfileInput } from '../dtos';
import { Avatar, User } from '../entities';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Avatar)
    private avatarRepo: Repository<Avatar>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async filter(input: any): Promise<BasePaginationResponse<UserProfileOutput>> {
    const where: any = {};
    if (input.keyword) {
      where.name = ILike(`%${input.keyword}%`);
    }
    const [user, count] = await this.userRepo.findAndCount({
      where,
      relations: ['avatar'],
      skip: input.skip,
      take: input.take,
    });
    const output = plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });

    return {
      total: count,
      listData: output,
    };
  }

  async getProfile(userId: string): Promise<BaseApiResponse<UserProfileOutput>> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    const output = plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async getUser(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }
    const output = plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });
    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
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
        user,
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

    await this.userRepo.update(
      { id: userId },
      {
        ...updated,
      },
    );

    const output = plainToClass(UserProfileOutput, user, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
      status: RESULT_STATUS.SUCCEED,
    };
  }
}
