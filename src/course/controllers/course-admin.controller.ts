import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CourseFilterInput, CreateCourseInput, UpdateCourseInput } from '../dtos';
import { CourseAdminService } from '../providers';

@UseGuards(JwtAuthAdminGuard)
@Controller('admin/course')
export class CourseAdminController {
  constructor(private readonly courseService: CourseAdminService) {}

  @Post()
  createCourse(@ReqContext() ctx: RequestContext, @Body() input: CreateCourseInput) {
    return this.courseService.createCourse(ctx.user.id, input);
  }

  @Get('filter')
  filter(@Query() query: CourseFilterInput) {
    return this.courseService.filter(query);
  }

  @Get('detail/:id')
  getCourse(@Param('id') id: string) {
    return this.courseService.getCourse(id);
  }

  @Patch(':id')
  updateCourse(@Param('id') id: string, @Body() input: UpdateCourseInput) {
    return this.courseService.updateCourse(id, input);
  }

  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.removeCourse(id);
  }

  @Post('vdo-cipher-otp')
  generateVideoUrl(@Body() input: { videoId: string }) {
    return this.courseService.generateVideoUrl(input.videoId);
  }
}
