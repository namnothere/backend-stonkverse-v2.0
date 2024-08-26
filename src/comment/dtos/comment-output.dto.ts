import { IsNotEmpty, IsString } from 'class-validator';

export class CommentOutput {
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

  constructor(partial: Partial<CommentOutput>) {
    Object.assign(this, partial);
  }
}
