import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PromotionCodeService } from '../providers/promotion-code.service';
import { VerifyPromoInput } from '../dtos';
import { JwtAuthAdminGuard } from '../../auth';

@UseGuards(JwtAuthAdminGuard)
@Controller('promotion')
export class PromotionCodeController {
  constructor(private readonly promoService: PromotionCodeService) {}

  @Post('/verify')
  verifyPromotionCode(@Body() input: VerifyPromoInput) {
    return this.promoService.verifyPromotionCode(input.courseId, input.code);
  }
}