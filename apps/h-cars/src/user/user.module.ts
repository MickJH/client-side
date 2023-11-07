import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, AuthService],
  controllers: [AuthController],
  exports: [UserService],
})
export class UserModule {}
