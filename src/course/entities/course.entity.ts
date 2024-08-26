import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { CourseData } from './course-data.entity';
import { QuestionQuiz } from './question-quiz.entity';
import { CloudinaryFile } from '../../cloudinary/entities/file.entity';
import { Comment } from '../../comment/entities';
import { Category } from '../../layout/entities';

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

  @Column('float', { name: 'price', nullable: false, default: 0 })
  price: number;

  @Column('varchar', { name: 'estimated_price', nullable: true })
  estimatedPrice?: number;

  @OneToOne(() => CloudinaryFile, (fileRepo) => fileRepo.courseThumbnail)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: CloudinaryFile;

  @OneToOne(() => CloudinaryFile, (fileRepo) => fileRepo.courseCurriculum)
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CloudinaryFile;

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

  @Column('float', { name: 'ratings', nullable: true })
  ratings?: number;

  @Column('varchar', { name: 'purchased', nullable: true })
  purchased?: number;

  @OneToMany(() => QuestionQuiz, (questionQuiz) => questionQuiz.course, { eager: false })
  questions: QuestionQuiz[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('varchar', { name: 'created_by', nullable: true })
  createdBy?: string;

  constructor(partial: Partial<Course>) {
    Object.assign(this, partial);
  }
}
