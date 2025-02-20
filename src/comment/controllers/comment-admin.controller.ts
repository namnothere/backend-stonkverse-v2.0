import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../auth';
import { BaseApiResponse } from '../../shared/dtos';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { CommentFilterInput, CommentOutput, CreateCommentInput, UpdateCommentInput } from '../dtos';
import { CommentAdminService } from '../providers';

@Controller('admin/comment')
@UseGuards(JwtAuthAdminGuard)
export class CommentAdminController {
  constructor(private readonly commentService: CommentAdminService) {}

  @Post()
  create(@ReqContext() ctx: RequestContext, @Body() input: CreateCommentInput): Promise<BaseApiResponse<CommentOutput>> {
    return this.commentService.create(ctx.user.id, input);
  }

  @Get('filter')
  filter(@Query() query: CommentFilterInput) {
    return this.commentService.filter(query);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateCommentInput) {
    return this.commentService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<BaseApiResponse<CommentOutput>> {
    return this.commentService.remove(id);
  }
}
