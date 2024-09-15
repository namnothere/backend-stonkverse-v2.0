import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ILike, Repository } from 'typeorm';

import { CourseData } from '../../course-data/entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { User } from '../../user/entities';
import { CommentFilterInput, CommentOutput, CreateCommentInput, UpdateCommentInput } from '../dtos';
import { Comment, COMMENT_STATUS } from '../entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(CourseData)
    private readonly courseDataRepo: Repository<CourseData>,
  ) {}

  async create(userId: string, input: CreateCommentInput): Promise<BaseApiResponse<CommentOutput>> {
    const courseData = await this.courseDataRepo.findOne({
      where: { id: input.contentId },
    });

    if (!courseData) {
      throw new NotFoundException(MESSAGES.COURSE_DATA_NOT_FOUND);
    }

    const newComment: any = {
      ...input,
    };

    if (input.parentId) {
      const parentComment = await this.commentRepo.findOne({
        where: { id: input.parentId },
      });
      if (!parentComment) {
        throw new NotFoundException(MESSAGES.PARENT_COMMENT_NOT_FOUND);
      }
      newComment.parentComment = parentComment;
    }

    const comment = await this.commentRepo.save({
      ...newComment,
      user: { id: userId },
      courseData: { id: courseData.id },
    });

    const output = plainToInstance(CommentOutput, comment, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async filter(userId: string, input: CommentFilterInput): Promise<BasePaginationResponse<CommentOutput>> {
    const where: any = [];

    if (input.keyword) {
      where.push({
        content: ILike(`%${input.keyword}%`),
      });
      where.push({
        user: {
          name: ILike(`%${input.keyword}%`),
        },
      });
      where.push({
        courseData: {
          name: ILike(`%${input.keyword}%`),
        },
      });
    }

    if (input.courseId) {
      where.map((item) => {
        item.courseData = { id: input.courseId };
      });
    }

    where.map((item) => {
      item.user = { id: userId };
      item.status = COMMENT_STATUS.ACTIVE;
    });

    const [comments, count] = await this.commentRepo.findAndCount({
      where,
      relations: ['user', 'courseData'],
      skip: input.offset,
      take: input.limit,
    });

    const output = plainToInstance(CommentOutput, comments, {
      excludeExtraneousValues: true,
    });

    return {
      listData: output,
      total: count,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, input: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  async remove(userId: string, id: string): Promise<BaseApiResponse<CommentOutput>> {
    const comment = await this.commentRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException(MESSAGES.COMMENT_NOT_FOUND);
    }

    await this.commentRepo.softDelete({ id });

    const output = plainToInstance(CommentOutput, comment, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }
}
