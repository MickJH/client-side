import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('follow')
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post()
  async follow(@Request() req, @Body() body: { following: string }) {
    const { userId } = req.user;
    const { following } = body;

    if (userId === following) {
      throw new BadRequestException('Cannot follow yourself');
    }

    return this.followService.follow(userId, following);
  }
}
