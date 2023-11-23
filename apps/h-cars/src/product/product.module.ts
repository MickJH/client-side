import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductSchema } from '../models/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [ProductService, AuthService, JwtService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [ProductService],
})
export class CarModule {}
