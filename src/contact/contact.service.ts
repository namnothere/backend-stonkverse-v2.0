import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities';
import { MailService } from './mail.service';
import { CreateContactDto } from './dtos/create-contact.dto';

@Injectable()
export class ContactService {
  transporter: any;
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
  ) {}

  async create(data: CreateContactDto): Promise<Contact> {
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
      await this.mailService.sendMail({
        to: 'tnbh234@gmail.com',
        subject: 'Support Request: ' + newContact.problem,
        template: 'support-request.ejs',
        context: mailData,
      });
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
