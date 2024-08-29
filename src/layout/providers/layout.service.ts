import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse } from '../../shared/dtos';
import { LayoutFilterInput, LayoutOutput } from '../dtos';
import { Layout } from '../entities';

@Injectable()
export class LayoutService {
  private readonly chatbotUrl = 'http://207.148.64.246:8080/ask';
  private readonly axiosHeaders = {
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
  };

  constructor(
    @InjectRepository(Layout)
    private readonly layoutRepo: Repository<Layout>,
  ) {}

  async filter(filter: LayoutFilterInput): Promise<BaseApiResponse<LayoutOutput>> {
    if (!filter.type) {
      throw new BadRequestException();
    }

    const where: any = { type: filter.type };
    const layout = await this.layoutRepo.findOne({
      where,
      relations: {
        bannerImage: true,
        faq: true,
        categories: true,
      },
    });
    if (!layout) {
      throw new NotFoundException(MESSAGES.LAYOUT_NOT_FOUND);
    }
    const output = plainToClass(LayoutOutput, layout, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async chat(message: string) {
    const response = await axios.post(
      this.chatbotUrl,
      { newMessage: message },
      {
        headers: this.axiosHeaders,
      },
    );

    return { botResponse: response.data.response.trim() };
  }
}
