import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { In, Repository } from 'typeorm';

import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse } from '../../shared/dtos';
import { CreateLayoutInput, LayoutFilterInput, LayoutOutput, UpdateLayoutInput } from '../dtos';
import { Layout, FaqItem, Category, BannerImage, LAYOUT_TYPE } from '../entities';

@Injectable()
export class LayoutAdminService {
  constructor(
    @InjectRepository(Layout)
    private readonly layoutRepo: Repository<Layout>,

    @InjectRepository(FaqItem)
    private readonly faqRepo: Repository<FaqItem>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(BannerImage)
    private readonly bannerImageRepo: Repository<BannerImage>,
  ) {}

  async create(input: CreateLayoutInput): Promise<BaseApiResponse<LayoutOutput>> {
    if (input.bannerImage) {
      const image = await this.bannerImageRepo.findOne({ where: { public_id: input.bannerImage.public_id } });
      if (image) {
        input.bannerImage = image;
      } else {
        await this.bannerImageRepo.save(input.bannerImage);
      }
    }

    if (input.faq) {
      await this.faqRepo.save(input.faq);
    }

    if (input.categories) {
      const categoryTitles = input.categories.map((category) => category.title);
      const categories = await this.categoryRepo.find({ where: { title: In(categoryTitles) } });
      const existingTitles = new Set(categories.map((category) => category.title));

      const newCategories = await this.categoryRepo.save(
        categoryTitles.filter((title) => !existingTitles.has(title)).map((title) => this.categoryRepo.create({ title })),
      );
      input.categories = [...categories, ...newCategories];
    }

    console.log(input);

    const layout = await this.layoutRepo.save(input);
    const output = plainToClass(LayoutOutput, layout, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async update(id: string, input: UpdateLayoutInput): Promise<BaseApiResponse<LayoutOutput>> {
    const layout = await this.layoutRepo.findOne({
      where: { id, type: input.type },
      relations: {
        faq: true,
        bannerImage: true,
        categories: true,
      },
    });
    if (!layout) {
      throw new NotFoundException(MESSAGES.LAYOUT_NOT_FOUND);
    }

    const updated: any = {};

    if (input.categories && input.type === LAYOUT_TYPE.CATEGORIES) {
      const categoryTitles = input.categories.map((category) => category.title);
      const categories = await this.categoryRepo.find({ where: { title: In(categoryTitles) } });
      const existingTitles = new Set(categories.map((category) => category.title));

      const newCategories = await this.categoryRepo.save(
        categoryTitles.filter((title) => !existingTitles.has(title)).map((title) => this.categoryRepo.create({ title })),
      );

      updated.categories = [...categories, ...newCategories];
    }

    if (input.faq && input.type === LAYOUT_TYPE.FAQ) {
      const faqQuestions = input.faq.map((faq) => faq.question);
      const faqItems = layout.faq;
      const existingQuestions = new Set(faqItems.map((faq) => faq.question));

      const newFaqItems = await this.faqRepo.save(
        faqQuestions.filter((question) => !existingQuestions.has(question)).map((question) => this.faqRepo.create({ question })),
      );

      updated.faq = [...faqItems, ...newFaqItems];
    }

    if (input.bannerImage && input.type === LAYOUT_TYPE.BANNER) {
      const where: any = {
        public_id: input.bannerImage.public_id,
      };

      const banner = await this.bannerImageRepo.findOne({ where });
      if (!banner) {
        const bannerImage = await this.bannerImageRepo.save(input.bannerImage);
        updated.bannerImage = bannerImage;
      } else {
        updated.bannerImage = banner;
      }
    }

    await this.layoutRepo.update(layout.id, updated);

    const output = plainToClass(
      LayoutOutput,
      { ...layout, ...updated },
      {
        excludeExtraneousValues: true,
      },
    );

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }

  async filter(filter: LayoutFilterInput): Promise<BaseApiResponse<LayoutOutput>> {
    if (!filter.type) {
      throw new BadRequestException();
    }

    const where: any = { type: filter.type };
    const layout = await this.layoutRepo.findOne({
      where,
      relations: {
        faq: true,
        bannerImage: true,
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
}
