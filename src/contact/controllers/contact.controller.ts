import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from '../providers';
import { ContactOutput, CreateContactInput } from '../dtos';
import { BaseApiResponse } from '../../shared/dtos';

@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Post()
  async addContact(@Body() input: CreateContactInput): Promise<BaseApiResponse<ContactOutput>> {
    return await this.contactService.create(input);
  }
}
