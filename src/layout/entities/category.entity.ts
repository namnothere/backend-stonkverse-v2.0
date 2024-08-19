import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Course } from '../../course/entities';

@Entity({ name: 'category', schema: process.env.DB_SCHEMA || 'public' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @ManyToMany(() => Course, (course) => course.categories)
  courses?: Course[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
