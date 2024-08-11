import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { Comment } from './comment.entity';
import { CourseData } from './course-data.entity';
import { Category } from '../../layout/entities';
import { User } from '../../user/entities';

@Entity({ name: 'course', schema: process.env.DB_SCHEMA || 'public' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string;

  @ManyToMany(() => Category, (category) => category.courses)
  categories: Category[];

  @Column()
  price: number;

  @Column({ nullable: true })
  estimatedPrice?: number;

  // @Column('jsonb')
  // thumbnail: {
  //   public_id: string;
  //   url: string;
  // };

  @Column()
  tags: string;

  @Column()
  level: string;

  @Column()
  demoUrl: string;

  // @Column('jsonb')
  // benefits: { title: string }[];

  // @Column('jsonb')
  // prerequisites: { title: string }[];

  // @Column('jsonb')
  // forWho: { title: string }[];

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[];

  @OneToMany(() => CourseData, (courseData) => courseData.course)
  courseData: CourseData[];

  @Column('float', { nullable: true })
  ratings?: number;

  @Column({ nullable: true })
  purchased?: number;

  @ManyToMany(() => User, (user) => user.courses)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Course>) {
    Object.assign(this, partial);
  }
}
