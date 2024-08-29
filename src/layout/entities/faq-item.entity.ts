import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Layout } from './layout.entity';

@Entity({ name: 'faq_item', schema: process.env.DB_SCHEMA || 'public' })
export class FaqItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'question', nullable: false })
  question: string;

  @Column('varchar', { name: 'answer', nullable: false })
  answer: string;

  @ManyToOne(() => Layout, (layout) => layout.faq)
  @JoinColumn({ name: 'layout_id' })
  layout?: Layout;

  constructor(partial: Partial<FaqItem>) {
    Object.assign(this, partial);
  }
}
