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

  @Post('like-car')
  async likeCar(@Request() req, @Body() body: { carId: string }) {
    const userEmail = req.user.email;
    const { carId } = body;

    await this.userService.likeCar(userEmail, carId);
    return { message: 'Car liked successfully' };
  }

  @Post('like-product')
  async likeProduct(@Request() req, @Body() body: { productId: string }) {
    const userEmail = req.user.email;
    const { productId } = body;

    await this.userService.likeProduct(userEmail, productId);
    return { message: 'Product liked successfully' };
  }
}
