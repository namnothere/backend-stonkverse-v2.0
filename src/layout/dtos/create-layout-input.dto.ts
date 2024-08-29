import { IsOptional, IsString, IsArray, ValidateNested, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { LAYOUT_TYPE } from '../entities';

class BannerImageInput {
  @IsString()
  @IsOptional()
  public_id: string;

  @IsString()
  @IsOptional()
  url: string;
}

class FaqItemInput {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}

class CategoryInput {
  @IsString()
  title: string;
}

export class CreateLayoutInput {
  @IsEnum(LAYOUT_TYPE)
  @IsNotEmpty()
  type: LAYOUT_TYPE;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItemInput)
  faq: FaqItemInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryInput)
  categories: CategoryInput[];

  @IsOptional()
  @Type(() => BannerImageInput)
  bannerImage: BannerImageInput;

  constructor(partial: Partial<CreateLayoutInput>) {
    Object.assign(this, partial);
  }
}
