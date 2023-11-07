import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { LoginDTO } from '../auth/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}

    @Post('register')
    async register(@Body() UserDTO: UserDTO) {
      const user = await this.userService.create(UserDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() LoginDTO: LoginDTO) {
      const user = await this.userService.findByLogin(LoginDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }

}