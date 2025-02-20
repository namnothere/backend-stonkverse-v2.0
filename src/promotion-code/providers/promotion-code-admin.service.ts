import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PromotionCode } from '../entities';
import { CreatePromotionCodeInput, UpdatePromotionCodeInput } from '../dtos';
import { MESSAGES } from '../../shared/constants';

@Injectable()
export class PromotionCodeAdminService {
  constructor(
    @InjectRepository(PromotionCode)
    private readonly promoCodeRepo: Repository<PromotionCode>,
  ) {}

  async createPromo(input: CreatePromotionCodeInput, adminId: string) {
    const promo = this.promoCodeRepo.create({ ...input, createdBy: { id: adminId } });
    return this.promoCodeRepo.save(promo);
  }

  async getPromo(id: string) {
    const promo = await this.promoCodeRepo.findOne({ where: { id } });
    if (!promo) throw new NotFoundException(MESSAGES.PROMOTION_CODE_INVALID);
    return promo;
  }

  async getPromos() {
    const promo = await this.promoCodeRepo.find({ where: { expDate: MoreThan(new Date()) } });
    if (!promo) throw new NotFoundException(MESSAGES.PROMOTION_CODE_INVALID);
    return promo;
  }

  async updatePromo(id: string, input: UpdatePromotionCodeInput) {
    const promo = await this.getPromo(id);
    Object.assign(promo, input);
    return this.promoCodeRepo.save(promo);
  }

  async deletePromo(id: string) {
    const promo = await this.getPromo(id);
    return this.promoCodeRepo.remove(promo);
  }
}
