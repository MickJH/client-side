import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
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

    await this.userService.follow(userEmail, followingUser);
    return { message: 'User followed successfully' };
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

  @Get('liked-cars')
  async getLikedCars(@Request() req) {
    const userEmail = req.user.email;
    return this.userService.getLikedCars(userEmail);
  }

  @Get('liked-products')
  async getLikedProducts(@Request() req) {
    const userEmail = req.user.email;
    return this.userService.getLikedProducts(userEmail);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const userEmail = req.user.email;
    return this.userService.findByEmail(userEmail);
  }

  @Get('all-users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
