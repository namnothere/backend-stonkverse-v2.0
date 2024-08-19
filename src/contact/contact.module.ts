import { Module } from '@nestjs/common';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { MailService } from './mail.service';
import { MailModule } from './mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]),
  MailModule,
],
  controllers: [ContactController],
  providers: [ContactService, MailService],
})
export class ContactModule {}
