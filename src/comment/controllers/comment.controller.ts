import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { CommentFilterInput, CommentOutput, CreateCommentInput, UpdateCommentInput } from '../dtos';
import { CommentService } from '../providers';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@ReqContext() ctx: RequestContext, @Body() input: CreateCommentInput): Promise<BaseApiResponse<CommentOutput>> {
    return this.commentService.create(ctx.user.id, input);
  }

  @Get('filter')
  filter(@ReqContext() ctx: RequestContext, @Query() query: CommentFilterInput): Promise<BasePaginationResponse<CommentOutput>> {
    return this.commentService.filter(ctx.user.id, query);
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
  remove(@ReqContext() ctx: RequestContext, @Param('id') id: string) {
    return this.commentService.remove(ctx.user.id, id);
  }
}
