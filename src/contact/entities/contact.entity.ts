import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'contact', schema: process.env.DB_SCHEMA || 'public' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('text', { name: 'problem' })
  problem: string;

  @Column('text', { name: 'explain' })
  explain: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Contact>) {
    Object.assign(this, partial);
  }
}
