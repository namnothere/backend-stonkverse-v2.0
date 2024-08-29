import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { Contact } from '../entities';
import { BaseApiResponse } from 'src/shared/dtos';
import { ContactOutput } from '../dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContactAdminService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async filter(): Promise<BaseApiResponse<ContactOutput[]>> {
    const contacts = await this.contactRepo.find();
    const output = plainToClass(ContactOutput, contacts, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    }
  }

  async delete(id: string): Promise<BaseApiResponse<null>> {
    const contact = await this.contactRepo.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(MESSAGES.CONTACT_NOT_FOUND);
    }

    await this.contactRepo.softDelete(id);
    return {
      status: RESULT_STATUS.SUCCEED,
    }
  }
}
