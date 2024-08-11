import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';

import { Avatar } from './avatar.entity';
import { Comment, Course } from '../../course/entities';
import { LearningProgress } from '../../learningprogress/entities';
import { Notification } from '../../notification/entities';

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

  @Column('varchar', { name: 'username' })
  @IsEmail()
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @OneToOne(() => Avatar, (avatar) => avatar.user)
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

  @ManyToMany(() => Course, course => course.users)
  courses: Course[];

  @OneToMany(() => LearningProgress, learningProgress => learningProgress.user)
  learningProgress: LearningProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
