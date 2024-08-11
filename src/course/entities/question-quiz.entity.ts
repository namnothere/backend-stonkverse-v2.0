import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CourseData } from './course-data.entity';

@Entity({ name: 'question_quiz', schema: process.env.DB_SCHEMA || 'public' })
export class QuestionQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'question', nullable: false })
  question: string;

  @Column('json', { name: 'answers', nullable: true })
  answers: string[];

  @Column('json', { name: 'correct_answers', nullable: true })
  correctAnswers: string;

  @ManyToOne(() => CourseData, (courseData) => courseData.quizzes)
  courseData: CourseData;

  constructor(partial: Partial<QuestionQuiz>) {
    Object.assign(this, partial);
  }
}