import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from 'jsonwebtoken';
import { CarService } from '../car/car.service';
import { CarDTO } from '../car/car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('car')
export class CarController {
  constructor(
    private carService: CarService,
  ) {}
  @Post('create-car')
  @UseGuards(JwtAuthGuard)
  async createCar(@Body() carDTO: CarDTO) {
    const car = await this.carService.create(carDTO);
    return car;
  }

  @Get('all-cars')
  @UseGuards(JwtAuthGuard) 
  async getAllCars() {
    const cars = await this.carService.getAll();
    return cars;
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard) 
  async getCarById(@Param('id') id: string) {
    const car = await this.carService.findById(id);
    return car;
  }

  @Get('my-cars')
  @UseGuards(JwtAuthGuard)
  async getMyCars(@Body() user: JwtPayload) {
    const cars = await this.carService.getMyCars(user._id);
    return cars;
  }

  @Post('update-car/:id')
  @UseGuards(JwtAuthGuard) 
  async updateCar(@Param('id') id: string, @Body() carDTO: CarDTO) {
    const updatedCar = await this.carService.update(id, carDTO);
    return updatedCar;
  }

  @Post('delete-car/:id')
  @UseGuards(JwtAuthGuard) 
  async deleteCar(@Param('id') id: string) {
    await this.carService.delete(id);
    return { message: 'Car deleted successfully' };
  }
}
