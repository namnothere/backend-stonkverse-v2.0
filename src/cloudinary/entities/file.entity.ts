import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Course } from '../../course/entities/course.entity';

export enum FILE_TYPE {
  THUMBNAIL = 'thumbnail',
  CURRICULUM = 'curriculum',
}

@Entity({ name: 'cloudinary_file', schema: process.env.DB_SCHEMA || 'public' })
export class CloudinaryFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'public_id', nullable: false })
  public_id: string;

  @Column('varchar', { name: 'url', nullable: false })
  url: string;

  @Column('varchar', { name: 'type', nullable: false, default: FILE_TYPE.THUMBNAIL })
  type: FILE_TYPE;

  @OneToOne(() => Course, (course) => course.thumbnail)
  courseThumbnail: Course;

  @OneToOne(() => Course, (course) => course.curriculum)
  courseCurriculum: Course;

  constructor(partial: Partial<CloudinaryFile>) {
    Object.assign(this, partial);
  }
}
