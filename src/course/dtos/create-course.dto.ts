import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export enum COURSE_LEVEL {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
}

export class CreateCourseInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  estimatedPrice: number;

  // @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.join(','), { toClassOnly: true })
  tags: string | string[];

  @IsString()
  level: COURSE_LEVEL;

  @IsString()
  demoUrl: string;

  @IsString()
  thumbnail: string;

  @IsString()
  curriculum: string;

  constructor(partial: Partial<CreateCourseInput>) {
    Object.assign(this, partial);
  }
}
