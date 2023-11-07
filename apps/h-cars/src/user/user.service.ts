import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import { UserDTO } from './user.dto';
import { LoginDTO } from '../auth/login.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
      ) {}
    
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
   // return user object without password
      removePassword(user: User) {
        const removePassword = user.toObject();
        delete removePassword['password'];
        return removePassword;
      }
      
      async findByLogin(loginDTO: LoginDTO): Promise<User> {
        const email = loginDTO.email;
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return this.removePassword(user);
      }
}