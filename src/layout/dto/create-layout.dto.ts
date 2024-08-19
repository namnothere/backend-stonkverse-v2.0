import { IsOptional, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { LAYOUT_TYPE } from '../entities/layout.entity';

class BannerImageDto {
  @IsString()
  public_id: string;

  @IsString()
  url: string;
}

class FaqItemDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

class CategoryDto {
  @IsString()
  title: string;
}

export class CreateLayoutDto {
  @IsEnum(LAYOUT_TYPE)
  type: LAYOUT_TYPE;

  @IsString()
  title?: string;

  @IsString()
  subTitle?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemDto)
  faq?: FaqItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BannerImageDto)
  banner_image?: BannerImageDto[];

  constructor(partial: Partial<CreateLayoutDto>) {
    Object.assign(this, partial);
  }
}
