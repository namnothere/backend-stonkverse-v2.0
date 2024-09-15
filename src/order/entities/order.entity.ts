import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities';
import { RegisterCourse } from '../../register-course/entities';
import { User } from '../../user/entities';

@Entity({ name: 'order', schema: process.env.DB_SCHEMA || 'public' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text', { name: 'payment_info', nullable: true })
  payment_info: string;

  @Column('float', { name: 'total', nullable: false, default: 0 })
  total: number;

  @OneToOne(() => RegisterCourse, (registerCourse) => registerCourse.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'register_id' })
  registerCourse: RegisterCourse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
