import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarService } from './car.service';
import { CarSchema } from '../models/car.schema';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [CarService, AuthService, JwtService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [CarService],
})
export class CarModule {}
