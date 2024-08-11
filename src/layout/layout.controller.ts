import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { LayoutService } from './layout.service';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Post()
  create(@Body() createLayoutDto: CreateLayoutDto) {
    return this.layoutService.create(createLayoutDto);
  }

  @Get()
  findAll() {
    return this.layoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutService.update(+id, updateLayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layoutService.remove(+id);
  }
}
