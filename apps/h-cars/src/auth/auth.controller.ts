import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('check-email/:email')
  async checkEmailAvailability(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return { isAvailable: !user };
  }

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    const user = await this.userService.create(userDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req) {
    return req.user;
  }
}
