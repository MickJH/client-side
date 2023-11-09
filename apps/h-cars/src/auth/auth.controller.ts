import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { JwtPayload } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

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
}
