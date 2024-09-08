import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationParamsDto } from '../../shared/dtos';
import { LAYOUT_TYPE } from '../entities';

export class LayoutFilterInput extends PaginationParamsDto {
  @IsString()
  @IsEnum(LAYOUT_TYPE)
  @IsOptional()
  type: string;
}
