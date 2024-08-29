import { Controller, Get, Delete, Param } from '@nestjs/common';

import { BaseApiResponse } from '../../shared/dtos';
import { ContactOutput } from '../dtos';
import { ContactAdminService } from '../providers';

@Controller('admin/contacts')
export class ContactAdminController {
  constructor(private readonly contactService: ContactAdminService) {}

  @Get('filter')
  async filter(): Promise<BaseApiResponse<ContactOutput[]>> {
    return this.contactService.filter();
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string): Promise<BaseApiResponse<null>> {
    return this.contactService.delete(id);
  }
}
