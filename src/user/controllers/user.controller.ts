import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserService } from '../providers';
import { UserUpdateProfileInput } from '../dtos';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('profile')
  getProfile(@ReqContext() ctx: RequestContext) {
    return this.userService.getProfile(ctx.user.id);
  }

  @Patch()
  updateUserProfile(@ReqContext() ctx: RequestContext, @Body() input: UserUpdateProfileInput) {
    return this.userService.updateUserProfile(ctx.user.id, input);
  }
}
