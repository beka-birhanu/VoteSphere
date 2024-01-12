// auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../src/users/dtos/createUserDto.dto';
import { SignInUserDto } from './dtos/signInUserDto.dto';
import { RefreshTokenDto } from './dtos/refreshTokenDto.dto';
import { SignOutUserDto } from './dtos/signoutUserDto.dto';

jest.mock('../../src/users/users.service');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signOut', () => {
    it('should sign out a user', async () => {
      const signOutDto: SignOutUserDto = {
        username: 'testuser123',
        token: 'mocked_refresh_token',
      };
      const expectedResult = true;

      // Mock the authService.revokeToken method with a resolved value of true
      jest.spyOn(authService, 'revokeToken').mockResolvedValue(true);

      
    });
    // Add more test cases for different scenarios
  });

  // Add tests for other AuthController methods
});
