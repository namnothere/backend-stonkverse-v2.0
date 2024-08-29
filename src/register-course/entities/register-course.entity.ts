import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Course } from '../../course/entities';
import { User } from '../../user/entities';

@Entity({ name: 'register_course', schema: process.env.DB_SCHEMA || 'public' })
export class RegisterCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.registeredCourses)
  user: User;

  @ManyToOne(() => Course)
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<RegisterCourse>) {
    Object.assign(this, partial);
  }
}
