import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'banner_image', schema: process.env.DB_SCHEMA || 'public' })
export class BannerImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public_id: string;

  @Column()
  url: string;

  constructor(partial: Partial<BannerImage>) {
    Object.assign(this, partial);
  }
}