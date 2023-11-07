import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import { UserDTO } from './user.dto';
import { LoginDTO } from '../auth/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(UserDTO: UserDTO) {
    const email = UserDTO.email;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(UserDTO);

    await createdUser.save();
    return this.removePassword(createdUser);
  }

  async findByLogin(LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exist', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.removePassword(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  removePassword(user: User) {
    const removePassword = user.toObject();
    delete removePassword['password'];
    return removePassword;
  }
  // the new methods
  async findByEmail(payload: JwtPayload) {
    const email = payload.email;
    return await this.userModel.findOne({ email });
  }
}
