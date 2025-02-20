import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionCode } from '../entities';
import { VerifyPromoOutput } from '../dtos';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse } from '../../shared/dtos';

@Injectable()
export class PromotionCodeService {
  constructor(
    @InjectRepository(PromotionCode)
    private readonly promoCodeRepo: Repository<PromotionCode>,
  ) {}

  async verifyPromotionCode(courseId: string, code: string): Promise<BaseApiResponse<VerifyPromoOutput>> {
    const promo = await this.promoCodeRepo.findOne({ where: { course: { id: courseId }, code }, relations: ['course'] });

    if (!promo) throw new NotFoundException(MESSAGES.PROMOTION_CODE_INVALID);
    if (promo.usageCount >= promo.usageLimit) throw new BadRequestException(MESSAGES.PROMOTION_CODE_INVALID);
    if (new Date(promo.expDate) < new Date()) throw new BadRequestException(MESSAGES.PROMOTION_CODE_EXPIRED);

    return {
      status: RESULT_STATUS.SUCCEED,
      data: {
        valid: true,
        discount: promo.percentOff
      }
    };
  }
}
