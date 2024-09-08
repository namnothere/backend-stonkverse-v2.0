import { Controller, Post, Get, Param, Body, UseGuards, Patch, Query } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../auth';
import { CreateLayoutInput, LayoutFilterInput, UpdateLayoutInput } from '../dtos';
import { LayoutAdminService } from '../providers';

@Controller('admin/layout')
@UseGuards(JwtAuthAdminGuard)
export class LayoutAdminController {
  constructor(private readonly layoutService: LayoutAdminService) {}

  @Post()
  create(@Body() input: CreateLayoutInput) {
    return this.layoutService.create(input);
  }

  // XEM LẠI
  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateLayoutInput) {
    return this.layoutService.update(id, input);
  }

  // @Delete('delete-layout/:id')
  // delete(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
  //   return this.layoutService.update(id, updateLayoutDto);
  // }

  @Get('filter')
  filter(@Query() query: LayoutFilterInput) {
    return this.layoutService.filter(query);
  }
}
