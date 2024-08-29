import { Controller, Post, Body, Get } from '@nestjs/common';

import { BaseApiResponse } from '../../dtos';
import { EmailOutput } from '../dtos';
import { MailService } from '../providers';

@Controller('email')
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  filter(): Promise<BaseApiResponse<EmailOutput[]>> {
    return this.mailService.filter();
  }
}
