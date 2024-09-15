import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { plainToInstance } from 'class-transformer';
import { join } from 'path';
import { Repository } from 'typeorm';

import { Contact } from '../../../contact/entities';
import { Order } from '../../../order/entities';
import { User } from '../../../user/entities';
import { RESULT_STATUS } from '../../constants';
import { BaseApiResponse } from '../../dtos';
import { EmailOutput } from '../dtos';
import { Email } from '../entities';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepo: Repository<Email>,
    private mailerService: MailerService,
  ) {}

  async sendMail(to: string, subject: string, template: string, context: any, from?: string) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment) {
      this.mailerService
        .sendMail({
          to,
          subject,
          template: join('..', 'templates', template),
          context,
          ...(from && { from }),
        })
        .then();
    }

    const contextString = JSON.stringify(context);

    await this.emailRepo.save({
      to,
      subject,
      template,
      context: contextString,
      from,
    });
  }

  async sendUserConfirmationTest(email: string, token: string) {
    const context = { name: 'TEST', token };
    this.sendMail(email, 'Welcome to Stock E-Learning! Confirm your Email', 'activation-email', context).then();
    return true;
  }

  async sendUserConfirmation(user: User, token: string) {
    const context = { name: user.name, token };
    this.sendMail(user.email, 'Welcome to Stock E-Learning! Confirm your Email', 'activation-email', context).then();
    return true;
  }

  sendSupportRequest(contact: Contact) {
    const context = {
      email: contact.email,
      problem: contact.problem,
      explain: contact.explain,
    };
    this.sendMail('tnbh234@gmail.com', 'New Support Request Arrived', 'support-request', context).then();
    return true;
  }

  async filter(): Promise<BaseApiResponse<EmailOutput[]>> {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      const emails = await this.emailRepo.find();

      const output = plainToInstance(EmailOutput, emails, {
        excludeExtraneousValues: true,
      });

      return {
        status: RESULT_STATUS.SUCCEED,
        data: output,
      };
    }

    return {
      status: RESULT_STATUS.SUCCEED,
      data: null,
    };
  }

  // TODO: email template
  async sendOrderConfirmation(order: Order) {
    const context = {
      created_at: order.createdAt,
      course_name: order.course.name,
      total: order.total,
      order_id: order.id,
    };
    this.sendMail(order.user.email, 'Order Confirmation', 'order-confirmation', context).then();
    return true;
  }
}
