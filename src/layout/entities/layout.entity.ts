import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { BannerImage } from './banner-image.entity';
import { Category } from './category.entity';
import { FaqItem } from './faq-item.entity';

export enum LAYOUT_TYPE {
  FAQ = 'FAQ',
  CATEGORIES = 'CATEGORIES',
  BANNER = 'BANNER',
}

@Entity({ name: 'layout', schema: process.env.DB_SCHEMA || 'public' })
export class Layout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'type', nullable: false })
  type: LAYOUT_TYPE;

  @OneToMany(() => FaqItem, (faqItem) => faqItem)
  faq: FaqItem[];

  @OneToMany(() => Category, (category) => category)
  categories: Category[];

  @ManyToOne(() => BannerImage, (bannerImage) => bannerImage)
  image: BannerImage;

  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @Column('varchar', { name: 'sub_title', nullable: false })
  subTitle: string;

  constructor(partial: Partial<Layout>) {
    Object.assign(this, partial);
  }
}
