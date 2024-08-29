import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Layout } from './layout.entity';

@Entity({ name: 'banner_image', schema: process.env.DB_SCHEMA || 'public' })
export class BannerImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'public_id', nullable: false })
  public_id: string;

  @Column('varchar', { name: 'url', nullable: false })
  url: string;

  @OneToMany(() => Layout, (layout) => layout.bannerImage)
  layouts: Layout[];

  constructor(partial: Partial<BannerImage>) {
    Object.assign(this, partial);
  }
}
