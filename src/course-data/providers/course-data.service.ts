import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { In, Repository } from 'typeorm';

import { CommentOutput } from '../../comment/dtos';
import { Comment, COMMENT_STATUS, COMMENT_TYPE } from '../../comment/entities';
import { CourseOutput } from '../../course/dtos';
import { MESSAGES } from '../../shared/constants';
import { BasePaginationResponse, PaginationParamsDto } from '../../shared/dtos';
import { User } from '../../user/entities';
import { CreateCourseDatumInput, UpdateCourseDatumInput } from '../dtos';
import { CourseData } from '../entities';

@Injectable()
export class CourseDataService {
  constructor(
    @InjectRepository(CourseData)
    private readonly courseDataRepo: Repository<CourseData>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  create(input: CreateCourseDatumInput) {
    return 'This action adds a new courseDatum';
  }

  findAll() {
    return `This action returns all courseData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseDatum`;
  }

  async getCourseContentDetail(userId: string, courseDataId: string) {
    const register = await this.userRepo.findOne({
      where: {
        id: userId,
        registeredCourses: {
          course: {
            courseData: {
              id: courseDataId,
            },
          },
        },
      },
      relations: {
        registeredCourses: {
          course: {
            courseData: true,
          },
        },
      },
    });

    if (!register) {
      throw new NotFoundException(MESSAGES.USER_DOES_NOT_OWN_COURSE);
    }

    const courseData = await this.courseDataRepo.findOne({
      where: { id: courseDataId },
    });

    const output = plainToInstance(CourseOutput, courseData, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
    };
  }

  async getCourseContentDetailComments(
    userId: string,
    courseDataId: string,
    query: PaginationParamsDto,
  ): Promise<BasePaginationResponse<CommentOutput>> {
    const register = await this.userRepo.findOne({
      where: {
        id: userId,
        registeredCourses: {
          course: {
            courseData: {
              id: courseDataId,
            },
          },
        },
      },
      relations: {
        registeredCourses: {
          course: {
            courseData: true,
          },
        },
      },
    });

    if (!register) {
      throw new NotFoundException(MESSAGES.USER_DOES_NOT_OWN_COURSE);
    }

    const [comments, count] = await this.commentRepo.findAndCount({
      where: {
        courseData: { id: courseDataId },
        status: COMMENT_STATUS.ACTIVE,
        commentType: In([COMMENT_TYPE.QUESTION, COMMENT_TYPE.QUESTION_REPLY]),
      },
      skip: query.offset,
      take: query.limit,
    });

    const output = plainToInstance(CommentOutput, comments, {
      excludeExtraneousValues: true,
    });

    return {
      listData: output,
      total: count,
    };
  }

  update(id: number, input: UpdateCourseDatumInput) {
    return `This action updates a #${id} courseDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseDatum`;
  }
}
