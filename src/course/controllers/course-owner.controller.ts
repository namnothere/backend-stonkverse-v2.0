import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';

import { RolesGuard } from '../../auth';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CourseFilterInput, CreateCourseInput, UpdateCourseInput } from '../dtos';
import { CourseOwnerService } from '../providers';
import { Roles } from '../..//common';
import { USER_ROLE } from '../../user/entities';

@UseGuards(RolesGuard)
@Roles(USER_ROLE.INSTRUCTOR)
@Controller('owner/course')
export class CourseOwnerController {
  constructor(private readonly courseService: CourseOwnerService) {}

  @Post()
  createCourse(@ReqContext() ctx: RequestContext, @Body() input: CreateCourseInput) {
    return this.courseService.createCourse(ctx.user.id, input);
  }

  @Get('filter')
  filter(@ReqContext() ctx: RequestContext, @Query() query: CourseFilterInput) {
    return this.courseService.filter(ctx.user.id, query);
  }

  @Get('detail/:id')
  getCourse(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.courseService.getCourse(ctx.user.id, id);
  }

  @Patch(':id')
  updateCourse(@ReqContext() ctx: RequestContext, @Param('id') id: string, @Body() input: UpdateCourseInput) {
    return this.courseService.updateCourse(ctx.user.id, id, input);
  }

  @Delete(':id')
  removeCourse(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.courseService.removeCourse(ctx.user.id, id);
  }

  @Post('vdo-cipher-otp')
  generateVideoUrl(@Body() input: { videoId: string }) {
    return this.courseService.generateVideoUrl(input.videoId);
  }
}
