import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Stripe } from 'stripe';
import { Like, Repository } from 'typeorm';

import { Course } from '../../course/entities';
import { RegisterCourse } from '../../register-course/entities';
import { MESSAGES, RESULT_STATUS, STRIPE } from '../../shared/constants';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { MailService } from '../../shared/mail';
import { User } from '../../user/entities';
import { CreateOrderInput, OrderFilterInput, OrderOutput, UpdateOrderInput } from '../dtos';
import { Order } from '../entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(RegisterCourse)
    private readonly registerCourseRepo: Repository<RegisterCourse>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @Inject(STRIPE)
    private readonly stripeClient: Stripe,
    private readonly mailService: MailService,
  ) {}

  async create(userId: string, input: CreateOrderInput): Promise<BaseApiResponse<OrderOutput>> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: {
        registeredCourses: {
          course: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    const course = await this.courseRepo.findOne({ where: { id: input.courseId } });
    if (!course) {
      throw new NotFoundException(MESSAGES.COURSE_NOT_FOUND);
    }

    const registeredCourseIds = user.registeredCourses.map((c) => c.course.id);
    if (registeredCourseIds.includes(course.id)) {
      throw new BadRequestException(MESSAGES.COURSE_ALREADY_REGISTERED);
    }

    const paymentIntentId = input.payment_info.id;
    const paymentIntent = await this.stripeClient.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestException(MESSAGES.PAYMENT_NOT_AUTHORIZED);
    }

    const order = this.orderRepo.create({
      user,
      course,
      payment_info: JSON.stringify(input.payment_info),
      total: course.price,
    });

    const register = await this.registerCourseRepo.save({
      user,
      course,
      order,
    });

    await this.mailService.sendOrderConfirmation(register.order);

    const output = plainToInstance(OrderOutput, register.order);
    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async filter(userId: string, input: OrderFilterInput): Promise<BasePaginationResponse<OrderOutput>> {
    const where: any = { user: { id: userId } };
    if (input.keyword) {
      where.course = { name: Like(`%${input.keyword}%`) };
    }
    const [orders, count] = await this.orderRepo.findAndCount({ where });
    const output = plainToInstance(OrderOutput, orders);
    return {
      listData: output,
      total: count,
    };
  }

  async findOne(userId: string, id: string): Promise<BaseApiResponse<OrderOutput>> {
    const where: any = { id, user: { id: userId } };
    const order = await this.orderRepo.findOne({ where, relations: ['user', 'course'] });
    if (!order) {
      throw new NotFoundException(MESSAGES.ORDER_NOT_FOUND);
    }
    const output = plainToInstance(OrderOutput, order, { excludeExtraneousValues: true });
    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  update(id: string, input: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
