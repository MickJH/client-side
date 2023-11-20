import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        JwtAuthGuard,
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {}, 
        },
      ],
      imports: [UserModule, MongooseModule.forRoot(process.env.MONGO_URI)],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
