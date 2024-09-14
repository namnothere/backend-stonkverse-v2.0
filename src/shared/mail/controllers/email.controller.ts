import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../../auth';
import { BaseApiResponse } from '../../dtos';
import { EmailOutput } from '../dtos';
import { MailService } from '../providers';

@Controller('email')
@UseGuards(JwtAuthAdminGuard)
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  filter(): Promise<BaseApiResponse<EmailOutput[]>> {
    return this.mailService.filter();
  }
}
