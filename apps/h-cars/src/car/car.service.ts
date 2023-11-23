import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Car } from './car';
import { CarDTO } from './car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private carModel: Model<Car>) {}

  async create(carDTO: CarDTO) {
    const numberPlate = carDTO.numberPlate;
    const car = await this.carModel.findOne({ numberPlate });
    if (car) {
      throw new HttpException('car already exists', HttpStatus.BAD_REQUEST);
    }

    const createdCar = new this.carModel(carDTO);

    await createdCar.save();
    return createdCar;
  }

  async getMyCars(userEmail: string): Promise<Car[]> {
    return this.carModel.find({ userEmail }).exec();
  }

  async getAll() {
    return this.carModel.find().exec();
  }

  async findById(id: string) {
    return this.carModel.findById(id).exec();
  }

  async update(id: string, carDTO: CarDTO) {
    return this.carModel.findByIdAndUpdate(id, carDTO, { new: true }).exec();
  }

  async delete(id: string) {
    return this.carModel.findByIdAndDelete(id).exec();
  }
}
