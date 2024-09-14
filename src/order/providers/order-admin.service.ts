import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Stripe } from 'stripe';
import { Like, Repository } from 'typeorm';

// import { Course } from '../../course/entities';
// import { RegisterCourse } from '../../register-course/entities';
import { MESSAGES, RESULT_STATUS, STRIPE } from '../../shared/constants';
import { BasePaginationResponse } from '../../shared/dtos';
// import { User } from '../../user/entities';
import { OrderFilterInput, OrderOutput, UpdateOrderInput } from '../dtos';
import { Order } from '../entities';

@Injectable()
export class OrderAdminService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    // @InjectRepository(RegisterCourse)
    // private readonly registerCourseRepo: Repository<RegisterCourse>,
    // @InjectRepository(Course)
    // private readonly courseRepo: Repository<Course>,
    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>,
    @Inject(STRIPE)
    private readonly stripeClient: Stripe,
  ) {}

  async createIntent() {
    return this.stripeClient.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      confirmation_method: 'automatic',
      payment_method: 'pm_card_visa',
      confirm: true,
      return_url: 'http://localhost:3000',
    });
  }

  async filter(input: OrderFilterInput): Promise<BasePaginationResponse<OrderOutput>> {
    const where: any = {};
    if (input.keyword) {
      where.course = { name: Like(`%${input.keyword}%`) };
    }
    const [orders, count] = await this.orderRepo.findAndCount({ where, skip: input.offset, take: input.limit });
    const output = plainToInstance(OrderOutput, orders);
    return {
      listData: output,
      total: count,
    };
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {
        registerCourse: true,
        user: true,
      },
    });
    if (!order) {
      throw new NotFoundException(MESSAGES.ORDER_NOT_FOUND);
    }
    const output = plainToInstance(OrderOutput, order);
    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  update(id: string, input: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    // TODO soft delete doesn't work on child entities
    const order = await this.orderRepo.findOne({ where: { id }, relations: { registerCourse: true } });
    if (!order) {
      throw new NotFoundException(MESSAGES.ORDER_NOT_FOUND);
    }
    // const register = await this.registerCourseRepo.findOne({ where: { id: order.registerCourse.id }, relations: { order: true} });
    await this.orderRepo.softRemove({ id });
    // await this.registerCourseRepo.softRemove({ id: register.id });
    return {
      status: RESULT_STATUS.SUCCEED,
    };
  }
}
