import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailService } from '../providers';
import { BaseApiResponse } from '../../../shared/dtos';
import { EmailOutput } from '../dtos';

@Controller('email')
export class EmailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Get()
  filter(): Promise<BaseApiResponse<EmailOutput[]>> {
    return this.mailService.filter();
  }
}
