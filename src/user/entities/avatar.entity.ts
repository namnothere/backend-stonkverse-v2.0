import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'avatar', schema: process.env.DB_SCHEMA || 'public' })
export class Avatar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  public_id: string;

  @Column()
  url: string;

  @OneToOne(() => User, (user) => user.avatar)
  user: User;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
