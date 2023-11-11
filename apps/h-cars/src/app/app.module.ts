import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module';
import { CarController } from '../car/car.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { CarService } from '../car/car.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    CarModule,
  ],
  controllers: [AppController, AuthController, CarController],
  providers: [AppService, JwtService, JwtAuthGuard, AuthService],
})
export class AppModule {}
