import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'banner_image', schema: process.env.DB_SCHEMA || 'public' })
export class BannerImage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;


  @Column('varchar', { name: 'public_id', nullable: false })
  public_id: string;

  @Column('varchar', { name: 'url', nullable: false })
  url: string;

  constructor(partial: Partial<BannerImage>) {
    Object.assign(this, partial);
  }
}
