import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";

export class CreateCourseDatumInput {
  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  videoSection: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  videoLength: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LinkInput)
  links: LinkInput[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => QuizInput)
  quiz: QuizInput[];
}

class LinkInput {
  @IsString()
  title: string;

  @IsString()
  url: string;
}

class QuizInput {
  @IsString()
  title: string;

  @IsString()
  correctAnswers: string[];

  @IsString()
  maxScore: number;

  @IsString()
  mockAnswers: string[];
}