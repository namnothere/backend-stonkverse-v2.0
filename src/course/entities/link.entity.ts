import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CourseData } from './course-data.entity';

@Entity({ name: 'link', schema: process.env.DB_SCHEMA || 'public' })
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @Column('varchar', { name: 'url', nullable: false })
  url: string;

  @ManyToOne(() => CourseData, (courseData) => courseData.links)
  courseData: CourseData;

  constructor(partial: Partial<Link>) {
    Object.assign(this, partial);
  }
}
