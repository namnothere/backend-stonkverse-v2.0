import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { AnswerQuiz } from './answer-quiz.entity';
import { CourseData } from './course-data.entity';
import { Course } from './course.entity';

@Entity({ name: 'question_quiz', schema: process.env.DB_SCHEMA || 'public' })
export class QuestionQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'title', nullable: false })
  title: string;

  @Column('json', { name: 'correct_answers', nullable: true })
  correctAnswers: string;

  @ManyToOne(() => CourseData, (courseData) => courseData.quizzes)
  courseData: CourseData;

  @ManyToOne(() => Course, (course) => course.questions)
  course: Course;

  @OneToMany(() => AnswerQuiz, (answer) => answer.question)
  answers: AnswerQuiz[];

  @Column('float', { name: 'max_score', default: 0 })
  maxScore: number;

  constructor(partial: Partial<QuestionQuiz>) {
    Object.assign(this, partial);
  }
}
