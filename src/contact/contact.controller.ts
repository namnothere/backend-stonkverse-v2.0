import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './entities';
import { CreateContactDto } from './dtos/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Post('add')
  async addNewContact(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createContactDto);
  }

  @Get('get-all-contact')
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactService.getAllContacts();
  }

  @Delete('delete/:id')
  async deleteContact(@Param('id') id: string): Promise<void> {
    return await this.contactService.delete(id);
  }
}
