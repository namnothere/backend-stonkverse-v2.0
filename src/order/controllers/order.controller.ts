import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateOrderInput, OrderFilterInput, UpdateOrderInput } from '../dtos';
import { OrderService } from '../providers';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@ReqContext() ctx: RequestContext, @Body() input: CreateOrderInput) {
    return this.orderService.create(ctx.user.id, input);
  }

  @Get('filter')
  filter(@ReqContext() ctx: RequestContext, @Query() input: OrderFilterInput) {
    return this.orderService.filter(ctx.user.id, input);
  }

  @Get('detail/:id')
  findOne(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.orderService.findOne(ctx.user.id, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateOrderInput) {
    return this.orderService.update(id, input);
  }
}
