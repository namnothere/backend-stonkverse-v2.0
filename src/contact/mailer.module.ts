import { Module } from '@nestjs/common';
import { SendMailService } from './mailer.service';

@Module({
  providers: [SendMailService],
  exports: [SendMailService],
})
export class MailerModule {}
