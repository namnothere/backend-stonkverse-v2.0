import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { Layout, FaqItem, Category, LAYOUT_TYPE, BannerImage } from './entities';

@Injectable()
export class LayoutService {
  private readonly chatbotUrl = 'http://207.148.64.246:8080/ask';
  private readonly axiosHeaders = {
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
  };

  constructor(
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,

    @InjectRepository(FaqItem)
    private readonly faqRepository: Repository<FaqItem>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(BannerImage)
    private readonly bannerImageRepository: Repository<BannerImage>,
  ) {}

  async create(createLayoutDto: CreateLayoutDto): Promise<Layout> {
    const layout = this.layoutRepository.create(createLayoutDto);
    return this.layoutRepository.save(layout);
  }

  async update(id: string, updateLayoutDto: UpdateLayoutDto) {
    const layout = await this.layoutRepository.findOne({ where: { id } });
    console.log("id nek:", layout)
    if (!layout) {
      throw new NotFoundException(`Layout with id ${id} not found`);
    }

    layout.type = updateLayoutDto.type;
    await this.updateLayoutData(layout, updateLayoutDto);

    return this.layoutRepository.save(layout);
  }

  private async updateLayoutData(layout: Layout, updateLayoutDto: UpdateLayoutDto) {
    switch (layout.type) {
      case LAYOUT_TYPE.BANNER:
        await this.updateBanner(layout, updateLayoutDto);
        break;
      case LAYOUT_TYPE.FAQ:
        layout.faq = await this.updateFaqItems(updateLayoutDto.faq);
        break;
      case LAYOUT_TYPE.CATEGORIES:
        layout.categories = await this.updateCategories(updateLayoutDto.categories);
        break;
      default:
        throw new BadRequestException(`Unknown layout type ${layout.type}`);
    }
  }

  private async updateBanner(layout: Layout, updateLayoutDto: UpdateLayoutDto) {
    const { banner_image, title, subTitle } = updateLayoutDto;
  
    if (banner_image && banner_image.length > 0) {
      const imageDto = banner_image[0];
      let bannerImage: BannerImage;
  
      if (imageDto.public_id) {
        bannerImage = await this.bannerImageRepository.findOne({
          where: { public_id: imageDto.public_id },
        });
  
        if (bannerImage) {
          bannerImage.url = imageDto.url;
        } else {
          bannerImage = this.bannerImageRepository.create(imageDto);
        }
      } else {
        bannerImage = this.bannerImageRepository.create(imageDto);
      }
  
      layout.image = await this.bannerImageRepository.save(bannerImage);
    }
  
    layout.title = title;
    layout.subTitle = subTitle;
  }
  

  
  private async updateFaqItems(faqDtos: FaqItem[]): Promise<FaqItem[]> {
    return this.faqRepository.save(faqDtos);
  }

  private async updateCategories(categories: Category[]): Promise<Category[]> {
    return this.categoryRepository.save(categories);
  }

  // async remove(id: string) {
  //   const layout = await this.layoutRepository.findOne({ where: { id } });
  //   if (!layout) {
  //     throw new NotFoundException(`Layout with id ${id} not found`);
  //   }
  //   await this.layoutRepository.delete(id);
  //   return { message: 'Layout removed successfully' };
  // }

  async getByType(type: LAYOUT_TYPE) {
    const layout = await this.layoutRepository.findOne({ where: { type } });
    if (!layout) {
      throw new NotFoundException(`Layout of type ${type} not found`);
    }
    return layout;
  }

  async chat(message: string) {
    if (!message) {
      throw new BadRequestException('Message is required');
    }

    const response = await axios.post(this.chatbotUrl, { newMessage: message }, {
      headers: this.axiosHeaders,
    });

    return { botResponse: response.data.response.trim() };
  }
}
