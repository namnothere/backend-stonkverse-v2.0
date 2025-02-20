import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PromotionCodeAdminService } from '../providers/promotion-code-admin.service';
import { CreatePromotionCodeInput, UpdatePromotionCodeInput } from '../dtos';
import { JwtAuthAdminGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@UseGuards(JwtAuthAdminGuard)
@Controller('admin/promotion')
export class PromotionCodeController {
  constructor(private readonly promoService: PromotionCodeAdminService) {}

  @Post()
  createPromo(@ReqContext() ctx: RequestContext, @Body() input: CreatePromotionCodeInput) {
    return this.promoService.createPromo(input, ctx.user.id);
  }

  @Get(':id')
  getPromo(@Param('id') id: string) {
    return this.promoService.getPromo(id);
  }

  @Patch(':id')
  updatePromo(@Param('id') id: string, @Body() input: UpdatePromotionCodeInput) {
    return this.promoService.updatePromo(id, input);
  }

  @Delete(':id')
  deletePromo(@Param('id') id: string) {
    return this.promoService.deletePromo(id);
  }
}
