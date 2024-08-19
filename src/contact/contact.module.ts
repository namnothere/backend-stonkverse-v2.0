import { Module } from '@nestjs/common';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MailerModule } from './mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]),
  MailerModule,
],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
