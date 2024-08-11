import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Comment } from './comment.entity';
import { Course } from './course.entity';
import { Link } from './link.entity';
import { QuestionQuiz } from './question-quiz.entity';

@Entity({ name: 'course_data', schema: process.env.DB_SCHEMA || 'public' })
export class CourseData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.courseData)
  course: Course;

  @Column('varchar', { name: 'title', nullable: false })
  title: string;

  @Column('varchar', { name: 'description', nullable: false })
  description: string;

  @Column('varchar', { name: 'video_url', nullable: true })
  videoUrl: string;

  // @Column('jsonb')
  // videoThumbnail: object;

  // @Column()
  // videoSection: string;

  // @Column()
  // videoLength: number;

  // @Column()
  // videoPlayer: string;

  @OneToMany(() => Link, (link) => link.courseData)
  links: Link[];

  // @Column()
  // suggestion: string;

  @OneToMany(() => Comment, (comment) => comment.courseData)
  comments: Comment[];

  @OneToMany(() => QuestionQuiz, (quiz) => quiz.courseData)
  quizzes: QuestionQuiz[];

  constructor(partial: Partial<CourseData>) {
    Object.assign(this, partial);
  }
}
