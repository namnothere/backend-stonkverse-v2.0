import { Controller, Post, Body } from '@nestjs/common';

import { BaseApiResponse } from '../../shared/dtos';
import { ContactOutput, CreateContactInput } from '../dtos';
import { ContactService } from '../providers';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async addContact(@Body() input: CreateContactInput): Promise<BaseApiResponse<ContactOutput>> {
    return this.contactService.create(input);
  }
}
