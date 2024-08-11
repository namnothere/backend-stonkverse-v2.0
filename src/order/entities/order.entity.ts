import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities';
import { Course } from '../../course/entities';

@Entity({ name: 'order', schema: process.env.DB_SCHEMA || 'public' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column('json', { nullable: true })
  payment_info: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
