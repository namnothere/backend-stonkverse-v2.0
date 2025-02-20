import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../../course/entities';
import { User } from '../../user/entities';

@Entity()
export class PromotionCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Course, { nullable: true, onDelete: 'CASCADE' })
  course?: Course;

  @Column({ type: 'date' })
  expDate: Date;

  @Column({ type: 'float' })
  percentOff: number;

  @Column({ default: 1 })
  usageLimit: number;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  createdBy: User;
}
