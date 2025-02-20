import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class VerifyPromoOutput {
  @IsBoolean()
  valid: boolean;

  @IsNumber()
  discount: number;
}
