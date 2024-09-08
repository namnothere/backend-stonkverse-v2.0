import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import { Avatar } from './avatar.entity';
import { Comment } from '../../comment/entities';
import { AnswerQuiz } from '../../course/entities';
import { LearningProgress } from '../../learningprogress/entities';
import { Notification } from '../../notification/entities';
import { RegisterCourse } from '../../register-course/entities';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  INSTRUCTOR = 'INSTRUCTOR',
}

@Entity({ name: 'users', schema: process.env.DB_SCHEMA || 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'email' })
  @IsEmail()
  email: string;

  @Column('varchar', { name: 'username' })
  username: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'activation_code' })
  activationCode: string;

  @Column('varchar', { name: 'token', nullable: true })
  token: string;

  @OneToOne(() => Avatar, (avatar) => avatar.user, { cascade: true })
  @JoinColumn({ name: 'avatar_id' })
  avatar: Avatar;

  @Column('varchar', {
    name: 'role',
    default: USER_ROLE.USER,
  })
  role: USER_ROLE;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column('boolean', { default: false })
  isActive: boolean;

  @OneToMany(() => RegisterCourse, (registerCourse) => registerCourse.user)
  registeredCourses: RegisterCourse[];

  @OneToMany(() => LearningProgress, (learningProgress) => learningProgress.user)
  learningProgress: LearningProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => AnswerQuiz, (answerQuiz) => answerQuiz.user)
  answers: AnswerQuiz[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
