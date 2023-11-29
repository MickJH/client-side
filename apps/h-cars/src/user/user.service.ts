import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import { UserDTO } from './user.dto';
import { LoginDTO } from '../auth/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { CarService } from '../car/car.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private carService: CarService,
    private productService: ProductService
  ) {}

  async create(UserDTO: UserDTO) {
    const email = UserDTO.email;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(UserDTO);

    await createdUser.save();
    return this.removePassword(createdUser);
  }

  async findByLogin(LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.removePassword(user);
    } else {
      throw new HttpException('invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }
  removePassword(user: User) {
    const removePassword = user.toObject();
    delete removePassword['password'];
    return removePassword;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async validatePayload(payload: JwtPayload) {
    return payload;
  }

  async follow(userEmail: string, followingUser: string) {
    if (!userEmail || !followingUser) {
      throw new HttpException('missing parameters', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findByEmail(userEmail);

    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND);
    }

    if (userEmail === followingUser) {
      throw new HttpException('cannot follow yourself', HttpStatus.BAD_REQUEST);
    }

    const isAlreadyFollowing = user.following.some(
      (follow) => follow.followingUser === followingUser
    );

    if (isAlreadyFollowing) {
      throw new HttpException(
        'You are already following this user',
        HttpStatus.BAD_REQUEST
      );
    }

    user.following.push({
      followingUser: followingUser,
      createdAt: new Date(),
    });

    await user.save();

    return 'You are now following this user: ' + followingUser;
  }

  async likeCar(userEmail: string, carId: string) {
    if (!userEmail || !carId) {
      throw new HttpException('missing parameters', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findByEmail(userEmail);

    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND);
    }

    const car = await this.carService.findById(carId);

    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }

    const isAlreadyLiked = user.likedCars.some(
      (likedCar) => likedCar.carId === carId
    );

    if (isAlreadyLiked) {
      throw new HttpException(
        'You have already liked this car',
        HttpStatus.BAD_REQUEST
      );
    }

    user.likedCars.push({
      carId: carId,
      createdAt: new Date(),
    });

    await user.save();
  }

  async likeProduct(userEmail: string, productId: string) {
    if (!userEmail || !productId) {
      throw new HttpException('missing parameters', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findByEmail(userEmail);

    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND);
    }

    const product = await this.productService.findById(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const isAlreadyLiked = user.likedProducts.some(
      (likedProduct) => likedProduct.productId === productId
    );

    if (isAlreadyLiked) {
      throw new HttpException(
        'You have already liked this product',
        HttpStatus.BAD_REQUEST
      );
    }

    user.likedProducts.push({
      productId: productId,
      createdAt: new Date(),
    });

    await user.save();
  }
}
