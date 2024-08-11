import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities';

export enum LEARNING_PROGRESS_STATUS {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
}

@Entity({ name: 'learning_progress', schema: process.env.DB_SCHEMA || 'public' })
export class LearningProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.learningProgress)
  user: User;

  @Column('varchar', { name: 'courseId' })
  courseId: string;

  @Column('varchar', { name: 'progress' })
  progress: string;

  @Column('varchar', { name: 'progress_status', default: LEARNING_PROGRESS_STATUS.NOT_STARTED })
  status: LEARNING_PROGRESS_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<LearningProgress>) {
    Object.assign(this, partial);
  }
}
