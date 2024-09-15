import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

import { COMMENT_TYPE } from '../entities';

export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsOptional()
  parentId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  contentId: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(COMMENT_TYPE)
  commentType: COMMENT_TYPE;

  constructor(partial: Partial<CreateCommentInput>) {
    Object.assign(this, partial);
  }
}
