import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Neo4jService } from '../neo4j/neo4j.service';
import { OfferService } from '../offer/offer.service';
import { OfferDTO } from '../offer/offer.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private neo4jService: Neo4jService,
    private offerService: OfferService
  ) {}

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

  @Get('recommendations/cars')
  async getRecommendedCars(@Request() req) {
    const userEmail = req.user.email;
    return this.neo4jService.recommendCars(userEmail);
  }

  @Get('recommendations/products')
  async getRecommendedProducts(@Request() req) {
    const userEmail = req.user.email;
    return this.neo4jService.recommendProducts(userEmail);
  }

  @Get('offers-for-car/:id')
  async getOffersForCar(@Param('id') id: string) {
    return this.offerService.getOffersForCar(id);
  }

  @Post('offer')
  async createOffer(
    @Request() req,
    @Body() body: { carId: string; price: number }
  ) {
    const userEmail = req.user.email;
    const { carId, price } = body;

    return this.offerService.createOffer({
      carId: carId,
      user: userEmail,
      price,
      createdAt: new Date(),
    });
  }

  @Post('update-offer/:id')
  async updateCar(@Param('id') id: string, @Body() offerDTO: OfferDTO) {
    const updatedCar = await this.offerService.updateOffer(id, offerDTO);
    return updatedCar;
  }

  @Post('delete-offer/:id')
  async deleteCar(@Param('id') id: string) {
    await this.offerService.deleteOffer(id);
    return { message: 'Offer deleted successfully' };
  }
}
