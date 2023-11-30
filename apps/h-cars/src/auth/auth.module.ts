import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, JwtAuthGuard, JwtService],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
