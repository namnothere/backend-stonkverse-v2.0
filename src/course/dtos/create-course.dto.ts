import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateCourseDatumInput } from '../../course-data/dtos';

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseDatumInput)
  courseData: CreateCourseDatumInput[];

  constructor(partial: Partial<CreateCourseInput>) {
    Object.assign(this, partial);
  }
}
