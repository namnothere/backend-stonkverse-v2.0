import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../auth';
import { OrderFilterInput, UpdateOrderInput } from '../dtos';
import { OrderAdminService } from '../providers';

@Controller('admin/order')
@UseGuards(JwtAuthAdminGuard)
export class OrderAdminController {
  constructor(private readonly orderService: OrderAdminService) {}

  // @Post()
  // create(@ReqContext() ctx: RequestContext, @Body() input: CreateOrderInput) {
  //   return this.orderService.create(ctx.user.id, input);
  // }

  @Get('payment-intent')
  getPaymentIntent() {
    return this.orderService.createIntent();
  }

  @Get('filter')
  filter(@Query() input: OrderFilterInput) {
    return this.orderService.filter(input);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateOrderInput) {
    return this.orderService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
