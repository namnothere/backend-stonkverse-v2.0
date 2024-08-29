import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateRegisterCourseDto } from '../dtos/create-register-course.dto';
import { UpdateRegisterCourseDto } from '../dtos/update-register-course.dto';
import { RegisterCourseService } from '../providers/register-course.service';

@Controller('register-course')
export class RegisterCourseController {
  constructor(private readonly registerCourseService: RegisterCourseService) {}

  @Post()
  create(@Body() createRegisterCourseDto: CreateRegisterCourseDto) {
    return this.registerCourseService.create(createRegisterCourseDto);
  }

  @Get()
  findAll() {
    return this.registerCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterCourseDto: UpdateRegisterCourseDto) {
    return this.registerCourseService.update(+id, updateRegisterCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerCourseService.remove(+id);
  }
}
