import { Injectable } from '@nestjs/common';

import { JwtPayload, sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: JwtPayload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: JwtPayload) {
    return await this.userService.validatePayload(payload);
  }

  async getCurrentUser(email: string) {
    return await this.userService.findByEmail(email);
  }
}
