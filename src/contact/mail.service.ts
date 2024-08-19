// src/contact/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: any;
}

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(options: MailOptions): Promise<void> {
    const templatePath = path.join(__dirname, '..', 'shared', 'mail', options.template);
    
    const html = await ejs.renderFile(templatePath, options.context);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.to,
      subject: options.subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
