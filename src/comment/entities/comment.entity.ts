import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Course } from '../../course/entities';
import { CourseData } from '../../course-data/entities';
import { User } from '../../user/entities';

export enum COMMENT_TYPE {
  REVIEW = 'REVIEW',
  QUESTION = 'QUESTION',
  REVIEW_REPLY = 'REVIEW_REPLY',
  QUESTION_REPLY = 'QUESTION_REPLY',
}

export enum COMMENT_STATUS {
  ACTIVE = 'ACTIVE',
  HIDDEN = 'HIDDEN',
  FLAGGED = 'FLAGGED',
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

  @Column('varchar', {
    name: 'status',
    default: COMMENT_STATUS.ACTIVE,
    nullable: false,
  })
  status: COMMENT_STATUS;

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

  @Column('int', { name: 'rating', default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
