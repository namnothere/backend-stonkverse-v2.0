import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { QuestionQuiz } from './question-quiz.entity';
import { User } from '../../user/entities';

@Entity({ name: 'answer_quiz', schema: process.env.DB_SCHEMA || 'public' })
export class AnswerQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @Column('text', { name: 'answer', nullable: false })
  answer: string;

  @Column('float', { name: 'score', default: 0 })
  score: number;

  @ManyToOne(() => QuestionQuiz, (question) => question.answers)
  question: QuestionQuiz;

  constructor(partial: Partial<AnswerQuiz>) {
    Object.assign(this, partial);
  }
}
