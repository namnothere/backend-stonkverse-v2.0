import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

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

  @OneToMany(() => FaqItem, (faqItem) => faqItem.layout)
  faq: FaqItem[];

  @ManyToMany(() => Category, (category) => category.layouts)
  @JoinTable({ name: 'layout_category', joinColumn: { name: 'layout_id' }, inverseJoinColumn: { name: 'category_id' } })
  categories: Category[];

  @ManyToOne(() => BannerImage, (bannerImage) => bannerImage)
  @JoinColumn({ name: 'banner_image_id' })
  bannerImage: BannerImage;

  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @Column('varchar', { name: 'sub_title', nullable: false })
  subTitle: string;

  constructor(partial: Partial<Layout>) {
    Object.assign(this, partial);
  }
}
