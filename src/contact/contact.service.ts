import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities';
import { SendMailService } from './mailer.service';

@Injectable()
export class ContactService {
  transporter: any;
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly sendMailService: SendMailService,
  ) {}

  async create(data: Partial<Contact>): Promise<Contact> {
    const newContact = this.contactRepository.create(data);
    await this.contactRepository.save(newContact);

    const mailData = {
      contact: {
        _id: newContact.id.toString().slice(0, 6),
        email: newContact.email,
        problem: newContact.problem,
        explain: newContact.explain,
      },
    };

    try {
      await this.sendMailService.sendMail(
        'tnbh234@gmail.com',
        'Support Request: ' + newContact.problem,
        './mail-template/support-request.hbs',
        mailData,
      );
    } catch (error) {
      throw new NotFoundException('Unable to send email');
    }

    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }

  async delete(id: string): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.contactRepository.delete(id);
  }
}
