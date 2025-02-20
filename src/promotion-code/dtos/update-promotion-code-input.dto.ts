import { IsDateString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdatePromotionCodeInput {
  @IsOptional()
  @IsDateString()
  expDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  percentOff?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  usageLimit?: number;
}
