import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module';
import { ProductModule } from '../product/product.module';
import { CarController } from '../car/car.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { ProductController } from '../product/product.controller';
import { CarService } from '../car/car.service';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    CarModule,
    ProductModule,
  ],
  controllers: [
    AppController,
    AuthController,
    CarController,
    ProductController,
  ],
  providers: [AppService, JwtService, JwtAuthGuard, AuthService],
})
export class AppModule {}
