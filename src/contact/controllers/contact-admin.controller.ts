import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ContactAdminService } from '../providers';
import { BaseApiResponse } from '../../shared/dtos';
import { ContactOutput } from '../dtos';

@Controller('admin/contacts')
export class ContactAdminController {
  constructor(
    private readonly contactService: ContactAdminService,
  ) {}

  @Get('filter')
  async filter(): Promise<BaseApiResponse<ContactOutput[]>> {
    return await this.contactService.filter();
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string): Promise<BaseApiResponse<null>> {
    return await this.contactService.delete(id);
  }
}
