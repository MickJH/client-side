import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { CarModule } from '../car/car.module';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ProductModule,
    CarModule,
  ],
  providers: [UserService, AuthService, JwtService],
  controllers: [AuthController],
  exports: [UserService],
})
export class UserModule {}
