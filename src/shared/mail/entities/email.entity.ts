import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum EMAIL_STATUS {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
}

@Entity({ name: 'email', schema: process.env.DB_SCHEMA || 'public' })
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'from', nullable: true })
  from: string;

  @Column('varchar', { name: 'to', nullable: false })
  to: string;

  @Column('text', { name: 'context', nullable: false })
  context: string;

  @Column('varchar', { name: 'subject', nullable: false })
  subject: string;

  @Column('varchar', { name: 'template', nullable: false })
  template: string;

  @Column('varchar', { name: 'status', nullable: false, default: EMAIL_STATUS.SUCCEED })
  status: string;

  constructor(partial: Partial<Email>) {
    Object.assign(this, partial);
  }
}
