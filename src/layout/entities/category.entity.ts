import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Layout } from './layout.entity';
import { Course } from '../../course/entities';

@Entity({ name: 'category', schema: process.env.DB_SCHEMA || 'public' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @ManyToMany(() => Course, (course) => course.categories)
  courses: Course[];

  @ManyToMany(() => Layout, (layout) => layout.categories)
  layouts: Layout[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
