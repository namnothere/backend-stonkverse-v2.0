import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { LayoutService } from '../providers/layout.service';
import { ChatInput, LayoutFilterInput } from '../dtos';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}
  @Get('filter')
  filter(@Query() query: LayoutFilterInput) {
    return this.layoutService.filter(query);
  }
  // XEM LẠI DO SERVER T3
  @Post('chat')
  chat(@Body() input: ChatInput) {
    return this.layoutService.chat(input.message);
  }
}
