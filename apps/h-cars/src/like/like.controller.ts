import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('like')
@UseGuards(JwtAuthGuard)
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('car')
  async likeCar(@Request() req, @Body() body: { carId: string }) {
    const { userId } = req.user;
    const { carId } = body;

    return this.likeService.likeCar(userId, carId);
  }

  @Post('product')
  async likeProduct(@Request() req, @Body() body: { productId: string }) {
    const { userId } = req.user;
    const { productId } = body;

    return this.likeService.likeProduct(userId, productId);
  }
}
