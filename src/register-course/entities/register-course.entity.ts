import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities';
import { Order } from '../../order/entities';
import { User } from '../../user/entities';

@Entity({ name: 'register_course', schema: process.env.DB_SCHEMA || 'public' })
export class RegisterCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.registeredCourses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToOne(() => Order, (order) => order.registerCourse, { cascade: true, onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(partial: Partial<RegisterCourse>) {
    Object.assign(this, partial);
  }
}
