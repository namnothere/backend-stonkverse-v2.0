import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BaseApiResponse } from 'src/shared/dtos';
import { Repository } from 'typeorm';

import { RESULT_STATUS } from '../../shared/constants';
import { MailService } from '../../shared/mail';
import { ContactOutput, CreateContactInput } from '../dtos';
import { Contact } from '../entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
  ) {}

  async create(input: CreateContactInput): Promise<BaseApiResponse<ContactOutput>> {
    const newContact = await this.contactRepository.save(input);
    this.mailService.sendSupportRequest(newContact);
    const output = plainToClass(ContactOutput, newContact, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }
}
