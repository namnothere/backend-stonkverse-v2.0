import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthAdminGuard } from '../../auth/guards';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserProfileOutput, UserUpdateProfileInput } from '../dtos';
import { UserAdminService } from '../providers';

@Controller('admin/user')
@UseGuards(JwtAuthAdminGuard)
export class UserAdminController {
  constructor(private readonly userService: UserAdminService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('filter')
  filter(@Body() input: any): Promise<BasePaginationResponse<UserProfileOutput>> {
    return this.userService.filter(input);
  }

  @Get('detail/:id')
  getUser(@Param('id') id: string): Promise<BaseApiResponse<UserProfileOutput>> {
    return this.userService.getUser(id);
  }

  @Get('profile')
  getProfile(@ReqContext() ctx: RequestContext): Promise<BaseApiResponse<UserProfileOutput>> {
    return this.userService.getProfile(ctx.user.id);
  }

  @Patch()
  updateUserProfile(@ReqContext() ctx: RequestContext, @Body() input: UserUpdateProfileInput) {
    return this.userService.updateUserProfile(ctx.user.id, input);
  }
}
