import { Controller, Post, Get, Param, Body, UseGuards, Patch, Query, Delete } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { LAYOUT_TYPE } from './entities';
import { JwtAuthGuard, } from '../auth';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('layout')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Post('create-layout')
  create(@Body() createLayoutDto: CreateLayoutDto) {
    console.log("test nek");
    return this.layoutService.create(createLayoutDto);
  }
  
  // XEM LẠI
  @Patch('edit-layout/:id')
  update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutService.update(id, updateLayoutDto);
  }

  // @Delete('delete-layout/:id')
  // delete(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
  //   return this.layoutService.update(id, updateLayoutDto);
  // }

  @Get('get-layout/:type')
  getLayoutByType(@Param('type') type: LAYOUT_TYPE) {
    return this.layoutService.getByType(type);
  }

  // XEM LẠI DO SERVER T3
  @Post('chat')
  chat(@Query('message') message: string) {
    return this.layoutService.chat(message);
  }
  
}
