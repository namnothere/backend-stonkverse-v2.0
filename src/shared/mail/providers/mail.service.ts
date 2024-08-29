import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from '../../../user/entities';
import { Contact } from '../../../contact/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../entities';
import { Repository } from 'typeorm';
import { RESULT_STATUS } from '../../../shared/constants';
import { BaseApiResponse } from '../../../shared/dtos';
import { plainToClass } from 'class-transformer';
import { EmailOutput } from '../dtos';
import { join } from 'path';
@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepo: Repository<Email>,
    private mailerService: MailerService
  ) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: any,
    from?: string,
  ) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment) {
      this.mailerService.sendMail({
        to,
        subject,
        template: join('..', 'templates', template),
        context,
        from
      }).then();
    }

    const contextString = JSON.stringify(context);

    await this.emailRepo.save({
      to,
      subject,
      template,
      context: contextString,
      from
    });
  }

  async sendUserConfirmationTest(email: string, token: string) {
    const context = { name: 'TEST', token };
    this.sendMail(
      email,
      'Welcome to Stock E-Learning! Confirm your Email',
      'activation-email',
      context,
    );
    return true;
  }

  async sendUserConfirmation(user: User, token: string) {
    const context = { name: user.name, token };
    this.sendMail(
      user.email,
      'Welcome to Stock E-Learning! Confirm your Email',
      'activation-email',
      context,
    );
    return true;
  }

  async sendSupportRequest(contact: Contact) {
    const context = {
      email: contact.email,
      problem: contact.problem,
      explain: contact.explain,
    };
    this.sendMail(
      'tnbh234@gmail.com',
      'New Support Request Arrived',
      'support-request',
      context,
    );
    return true;
  }

  async filter(): Promise<BaseApiResponse<EmailOutput[]>> {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      const emails = await this.emailRepo.find();

      const output = plainToClass(EmailOutput, emails, {
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
    }
  }

  // TODO: email template
}
