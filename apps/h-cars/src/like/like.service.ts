import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './like';

@Injectable()
export class LikeService {
  constructor(@InjectModel('Like') private likeModel: Model<Like>) {}

  async likeCar(userId: string, carId: string) {
    const like = new this.likeModel({ user: userId, car: carId });
    return like.save();
  }

  async likeProduct(userId: string, productId: string) {
    const like = new this.likeModel({ user: userId, product: productId });
    return like.save();
  }

  async getLikedCars(userId: string) {
    return this.likeModel.find({ user: userId }).populate('car').exec();
  }

  async getLikedProducts(userId: string) {
    return this.likeModel.find({ user: userId }).populate('product').exec();
  }
}
