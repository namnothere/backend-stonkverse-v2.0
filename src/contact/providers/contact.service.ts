import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities';
import { ContactOutput, CreateContactInput } from '../dtos';
import { BaseApiResponse } from 'src/shared/dtos';
import { plainToClass } from 'class-transformer';
import { RESULT_STATUS } from '../../shared/constants';
import { MailService } from '../../shared/mail';

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
