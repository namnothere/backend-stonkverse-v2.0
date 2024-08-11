import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearningprogressService } from './learningprogress.service';
import { CreateLearningprogressDto } from './dtos/create-learningprogress.dto';
import { UpdateLearningprogressDto } from './dtos/update-learningprogress.dto';

@Controller('learningprogress')
export class LearningprogressController {
  constructor(private readonly learningprogressService: LearningprogressService) {}

  @Post()
  create(@Body() createLearningprogressDto: CreateLearningprogressDto) {
    return this.learningprogressService.create(createLearningprogressDto);
  }

  @Get()
  findAll() {
    return this.learningprogressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningprogressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningprogressDto: UpdateLearningprogressDto) {
    return this.learningprogressService.update(+id, updateLearningprogressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningprogressService.remove(+id);
  }
}
