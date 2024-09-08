import { Expose, Type } from 'class-transformer';

import { LAYOUT_TYPE } from '../entities';

class BannerImageOutput {
  @Expose()
  id: string;

  @Expose()
  public_id: string;

  @Expose()
  url: string;
}

class FaqItemOutput {
  @Expose()
  id: string;

  @Expose()
  question: string;

  @Expose()
  answer: string;
}

class CategoryOutput {
  @Expose()
  id: string;

  @Expose()
  title: string;
}

export class LayoutOutput {
  @Expose()
  id: string;

  @Expose()
  type: LAYOUT_TYPE;

  @Expose()
  title: string;

  @Expose()
  subTitle: string;

  @Expose()
  @Type(() => FaqItemOutput)
  faq: FaqItemOutput[];

  @Expose()
  @Type(() => CategoryOutput)
  categories: CategoryOutput[];

  @Expose()
  @Type(() => BannerImageOutput)
  bannerImage: BannerImageOutput;

  constructor(partial: Partial<LayoutOutput>) {
    Object.assign(this, partial);
  }
}
