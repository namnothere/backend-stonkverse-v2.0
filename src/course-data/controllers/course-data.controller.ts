import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth';
import { CommentOutput } from '../../comment/dtos';
import { BasePaginationResponse, PaginationParamsDto } from '../../shared/dtos';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { UpdateCourseDatumInput } from '../dtos';
import { CourseDataService } from '../providers';

@Controller('course-data')
@UseGuards(JwtAuthGuard)
export class CourseDataController {
  constructor(private readonly courseDataService: CourseDataService) {}

  @Get()
  findAll() {
    return this.courseDataService.findAll();
  }

  @Get(':id')
  getCourseContentDetail(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.courseDataService.getCourseContentDetail(ctx.user.id, id);
  }

  @Get(':id/comments')
  getCourseContentDetailComments(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
    @Query() query: PaginationParamsDto,
  ): Promise<BasePaginationResponse<CommentOutput>> {
    return this.courseDataService.getCourseContentDetailComments(ctx.user.id, id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateCourseDatumInput) {
    return this.courseDataService.update(+id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseDataService.remove(+id);
  }
}
