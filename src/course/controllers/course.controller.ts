import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth';
import { Public } from '../../common';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CourseFilterInput } from '../dtos';
import { CourseService } from '../providers';

@Controller('course')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get('filter')
  @Public()
  filter(@Query() query: CourseFilterInput) {
    return this.courseService.filter(query);
  }

  @Get('detail/:id')
  @Public()
  getCourse(@Param('id') id: string) {
    return this.courseService.getCourse(id);
  }

  @Get(':courseId/course-data')
  getCourseContent(@ReqContext() ctx: RequestContext, @Param('courseId') courseId: string) {
    return this.courseService.getCourseContent(ctx.user.id, courseId);
  }

  @Get('my-courses')
  getMyCourses(@ReqContext() ctx: RequestContext) {
    return this.courseService.getMyCourses(ctx.user.id);
  }

  @Post('user-progress')
  getCurrentUserProgress(@ReqContext() ctx: RequestContext, @Body() input: { courseIds: string[] }) {
    return this.courseService.getCurrentUserProgress(ctx.user.id, input.courseIds);
  }
}
