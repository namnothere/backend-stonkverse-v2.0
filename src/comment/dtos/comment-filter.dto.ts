import { IsString, IsOptional } from 'class-validator';

import { PaginationParamsDto } from '../../shared/dtos';

export class CommentFilterInput extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @IsString()
  courseId: string;
}
