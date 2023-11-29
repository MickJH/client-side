import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product';
import { ProductDTO } from './product.dto';
import { LikeService } from '../like/like.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    private likeService: LikeService
  ) {}

  async create(productDTO: ProductDTO) {
    const createdProduct = new this.productModel(productDTO);

    await createdProduct.save();
    return createdProduct;
  }

  async getMyProducts(userEmail: string): Promise<Product[]> {
    return this.productModel.find({ userEmail }).exec();
  }

  async getAll() {
    return this.productModel.find().exec();
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, productDTO: ProductDTO) {
    return this.productModel
      .findByIdAndUpdate(id, productDTO, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async likeProduct(userId: string, productId: string) {
    return this.likeService.likeProduct(userId, productId);
  }

  async getLikedProducts(userId: string) {
    return this.likeService.getLikedProducts(userId);
  }
}
