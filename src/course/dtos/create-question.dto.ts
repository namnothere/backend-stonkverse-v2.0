import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  contentId: string;

  constructor(partial: Partial<CreateQuestionInput>) {
    Object.assign(this, partial);
  }
}
