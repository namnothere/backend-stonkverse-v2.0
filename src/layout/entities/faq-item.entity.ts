import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faq_item', schema: process.env.DB_SCHEMA || 'public' })
export class FaqItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  constructor(partial: Partial<FaqItem>) {
    Object.assign(this, partial);
  }
}
