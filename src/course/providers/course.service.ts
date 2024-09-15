import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ILike, In, IsNull, Repository } from 'typeorm';

import { Comment } from '../../comment/entities';
import { Notification } from '../../notification/entities';
import { RegisterCourse } from '../../register-course/entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { User } from '../../user/entities';
import { CourseFilterInput, CourseOutput, CreateQuestionInput } from '../dtos';
import { AnswerQuiz, Course, CourseData } from '../entities';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(CourseData)
    private readonly courseDataRepo: Repository<CourseData>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(AnswerQuiz)
    private readonly answerQuizRepo: Repository<AnswerQuiz>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(RegisterCourse)
    private readonly registerCourseRepo: Repository<RegisterCourse>,
  ) {}

  async filter(query: CourseFilterInput): Promise<BasePaginationResponse<CourseOutput>> {
    const where: any = {
      deletedAt: IsNull(),
    };

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
        courseData: false,
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

  async getCourseContent(userId: string, courseId: string) {
    const register = await this.registerCourseRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
      relations: {
        course: {
          courseData: true,
        },
      },
    });

    if (!register) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }

    const output = plainToInstance(CourseOutput, register.course.courseData, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
    };
  }

  async getCourseContentDetail(userId: string, courseId: string, id: string) {
    const register = await this.registerCourseRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId, courseData: { id } } },
      relations: {
        course: true,
      },
    });

    if (!register) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }

    const courseData = await this.courseDataRepo.findOne({
      where: { id },
    });

    const output = plainToInstance(CourseOutput, courseData, {
      excludeExtraneousValues: true,
    });

    return {
      data: output,
    };
  }

  async getCurrentUserProgress(userId: string, courseIds: string[]) {
    const user = await this.userRepo.findOne({
      where: { id: userId, registeredCourses: { id: In(courseIds) } },
      relations: {
        registeredCourses: true,
      },
    });

    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    const answers = await this.answerQuizRepo.find({
      where: {
        user: { id: userId },
        question: {
          course: { id: In(courseIds) },
        },
      },
      relations: {
        question: true,
      },
    });

    const courseScores = new Map<
      string,
      {
        courseName: string;
        totalScore: number;
        totalMaxScore: number;
        completionRate: number;
        quizScores: { title: string; score: number }[];
      }
    >();

    answers.forEach((answer) => {
      const courseId = answer.question.course.id;
      const courseName = answer.question.course.name;

      if (!courseScores.has(courseId)) {
        courseScores.set(courseId, {
          courseName,
          totalScore: 0,
          totalMaxScore: 0,
          completionRate: 0,
          quizScores: [],
        });
      }

      const courseScore = courseScores.get(courseId);
      if (courseScore) {
        courseScore.totalScore += answer.score;
        courseScore.totalMaxScore += answer.question.maxScore;
        courseScore.quizScores.push({ title: answer.question.title, score: answer.score });
      }
    });

    courseScores.forEach((scoreData) => {
      scoreData.completionRate = scoreData.totalMaxScore > 0 ? (scoreData.totalScore / scoreData.totalMaxScore) * 100 : 0;
    });

    const result = Array.from(courseScores.entries()).map(([courseId, scoreData]) => ({
      courseId,
      courseName: scoreData.courseName,
      totalScore: scoreData.totalScore,
      totalMaxScore: scoreData.totalMaxScore,
      completionRate: scoreData.completionRate,
      quizScores: scoreData.quizScores,
    }));

    return {
      status: RESULT_STATUS.SUCCEED,
      data: result,
    };
  }

  async getMyCourses(userId: string): Promise<BaseApiResponse<CourseOutput[]>> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: { registeredCourses: true } });
    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    const output = plainToInstance(CourseOutput, user.registeredCourses, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async createQuestion(userId: string, input: CreateQuestionInput): Promise<BaseApiResponse<null>> {
    const register = await this.registerCourseRepo.findOne({ where: { user: { id: userId } }, relations: { user: true } });
    if (!register) {
      throw new BadRequestException(MESSAGES.USER_DOES_NOT_OWN_COURSE);
    }

    const comment = await this.commentRepo.save({ ...input, user: { id: userId } });

    await this.notificationRepo.save({ ...input, user: { id: userId } });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: null,
    };
  }
}
