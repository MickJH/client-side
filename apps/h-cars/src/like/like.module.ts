import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeSchema } from '../models/like.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }])],
  controllers: [LikeController, AuthService, JwtService, JwtAuthGuard],
  providers: [LikeService],
})
export class LikeModule {}
