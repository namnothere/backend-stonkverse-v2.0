import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateRegisterCourseInput, UpdateRegisterCourseInput } from '../dtos';
import { RegisterCourseService } from '../providers';

@Controller('register-course')
export class RegisterCourseController {
  constructor(private readonly registerCourseService: RegisterCourseService) {}

  @Post()
  create(@Body() input: CreateRegisterCourseInput) {
    return this.registerCourseService.create(input);
  }

  @Get()
  findAll() {
    return this.registerCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerCourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateRegisterCourseInput) {
    return this.registerCourseService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerCourseService.remove(id);
  }
}
