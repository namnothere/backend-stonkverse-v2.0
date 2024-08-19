import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class SendMailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
  });

  async sendMail(email: string, subject: string, template: string, data: any): Promise<void> {
    const templatePath = path.join(__dirname, '..', 'mails', template);
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = { from: process.env.SMTP_MAIL, to: email, subject, html };

    await this.transporter.sendMail(mailOptions);
  }
}
