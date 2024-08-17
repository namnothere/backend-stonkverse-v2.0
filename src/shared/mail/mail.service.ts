import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationTest(email: string, token: string) {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Stock E-Learning! Confirm your Email',
      template: '../templates/activation-email',
      context: {
        name: 'TEST',
        token,
      },
    });
    return true;
  }
  async sendUserConfirmation(user: User, token: string) {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Stock E-Learning! Confirm your Email',
      template: '../templates/activation-email', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
        token,
      },
    });
    return true;
  }

  // TODO: email template
}
