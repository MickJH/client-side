import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { FollowSchema } from '../models/follow.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Follow', schema: FollowSchema }]),
  ],
  controllers: [FollowController, AuthService, JwtService, JwtAuthGuard],
  providers: [FollowService],
})
export class FollowModule {}
