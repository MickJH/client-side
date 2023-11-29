import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('follow')
  async follow(@Request() req, @Body() body: { followingUser: string }) {
    const userEmail = req.user.email;
    const { followingUser } = body;

    return this.userService.follow(userEmail, followingUser);
  }
}
