import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { ILike, Repository } from 'typeorm';

import { CloudinaryFile, FILE_TYPE } from '../../cloudinary/entities';
import { CloudinaryService } from '../../cloudinary/providers';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { CourseFilterInput, CourseOutput, CreateCourseInput, UpdateCourseInput } from '../dtos';
import { Course } from '../entities';

@Injectable()
export class CourseAdminService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(CloudinaryFile)
    private readonly cloudinaryFileRepo: Repository<CloudinaryFile>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getCourse(id: string): Promise<BaseApiResponse<CourseOutput>> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }
    const output = plainToInstance(CourseOutput, course, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async createCourse(userId: string, input: CreateCourseInput): Promise<BaseApiResponse<CourseOutput>> {
    const data: any = {
      ...input,
    };
    if (input.thumbnail) {
      const myCloud = await this.cloudinaryService.upload(input.thumbnail, {
        folder: 'courses',
      });

      const thumbnail = await this.cloudinaryFileRepo.save({
        url: myCloud.secure_url,
        public_id: myCloud.public_id,
      });

      data.thumbnail = thumbnail;
    }

    if (input.curriculum) {
      const myCloud = await this.cloudinaryService.upload(input.curriculum, {
        resource_type: 'auto',
        folder: 'curriculums',
      });

      const curriculum = await this.cloudinaryFileRepo.save({
        url: myCloud.secure_url,
        public_id: myCloud.public_id,
        type: FILE_TYPE.CURRICULUM,
      });

      data.curriculum = curriculum;
    }

    const course = await this.courseRepo.save({ ...data, createdBy: userId });
    const output = plainToInstance(CourseOutput, course, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async filter(query: CourseFilterInput): Promise<BasePaginationResponse<CourseOutput>> {
    const where: any = {};

    if (query.price) {
      where.price = query.price;
    }

    if (query.keyword) {
      where.name = ILike(`%${query.keyword}%`);
    }

    const [courses, count] = await this.courseRepo.findAndCount({
      where,
      skip: query.offset,
      take: query.limit,
      relations: {
        thumbnail: true,
        curriculum: true,
        courseData: true,
      },
    });

    const output = plainToInstance(CourseOutput, courses, {
      excludeExtraneousValues: true,
    });

    return {
      listData: output,
      total: count,
    };
  }

  async updateCourse(id: string, input: UpdateCourseInput) {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }

    if (input.thumbnail && !input.thumbnail.startsWith('https')) {
      const myCloud = await this.cloudinaryService.upload(input.thumbnail, {
        folder: 'courses',
        resource_type: 'auto',
        allowedFormats: ['jpg', 'png', 'pdf'],
      });

      const thumbnail = await this.cloudinaryFileRepo.save({
        url: myCloud.secure_url,
        public_id: myCloud.public_id,
      });

      course.thumbnail = thumbnail as any;
    }

    if (input.curriculum && !input.curriculum.startsWith('https')) {
      const myCloud = await this.cloudinaryService.upload(input.curriculum, {
        resource_type: 'auto',
        folder: 'curriculums',
        allowedFormats: ['jpg', 'png', 'pdf'],
      });
      const curriculum = await this.cloudinaryFileRepo.save({
        url: myCloud.secure_url,
        public_id: myCloud.public_id,
      });

      course.curriculum = curriculum as any;
    }

    await this.courseRepo.update(course.id, { ...(input as any) });
    const updatedCourse: any = {
      ...course,
      ...input,
    };

    const output = plainToInstance(CourseOutput, updatedCourse, {
      excludeExtraneousValues: true,
    });
    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async removeCourse(id: string) {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }
    await this.courseRepo.softDelete({ id });
    return {
      status: RESULT_STATUS.SUCCEED,
    };
  }

  async generateVideoUrl(videoId: string) {
    const data = await axios
      .post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        // ttl là Time to live: Thời gian cache
        { ttl: 300 },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        },
      )
      .then((res) => res.data);

    return {
      status: RESULT_STATUS.SUCCEED,
      data,
    };
  }
}
