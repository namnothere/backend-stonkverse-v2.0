import { IsOptional } from 'class-validator';

import { PaginationParamsDto } from '../../shared/dtos';

export class OrderFilterInput extends PaginationParamsDto {
  @IsOptional()
  keyword?: string;
}
