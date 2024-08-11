import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities';
import { Course } from './course.entity';
import { CourseData } from './course-data.entity';

export enum COMMENT_TYPE {
  REVIEW = 'REVIEW',
  QUESTION = 'QUESTION',
  REVIEW_REPLY = 'REVIEW_REPLY',
  QUESTION_REPLY = 'QUESTION_REPLY',
}

@Entity({ name: 'comment', schema: process.env.DB_SCHEMA || 'public' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'comment_type',
    default: COMMENT_TYPE.REVIEW,
    nullable: false,
  })
  commentType: COMMENT_TYPE;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Course, (course) => course.comments, { nullable: true })
  course: Course;

  @ManyToOne(() => CourseData, (courseData) => courseData.comments, { nullable: true })
  courseData: CourseData;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @Column('varchar', { name: 'title', nullable: true })
  title?: string;

  @Column('text', { name: 'content', nullable: true })
  content: string;

  @Column('int', {name: 'rating', default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
