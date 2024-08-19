import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './entities';
import { SendMailService } from './mailer.service';

@Controller('contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Post()
  async addNewContact(@Body() data: Partial<Contact>): Promise<Contact> {
    return await this.contactService.create(data);
  }

  @Get('get-all-contact')
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactService.getAllContacts();
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string): Promise<void> {
    return await this.contactService.delete(id);
  }
}
