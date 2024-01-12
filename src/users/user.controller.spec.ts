import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../src/typeORM/entities/user';
import { UserController } from './user.controller';
import { UsersService } from '../../src/users/users.service';

jest.mock('bcrypt');

describe('UsersController', () => {
  let usersController: UserController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            // Mock JwtService methods if needed
          },
        },
      ],
    }).compile();

    usersController = module.get<UserController>(UserController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getPost', () => {
    it('should return a message with the provided username', () => {
      const username = 'testuser';
      const result = usersController.getPost(username);

      expect(result).toEqual({ message: `Fetching posts for user: ${username}` });
    });
  });
});

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepositoryMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: JwtService,
          useValue: {
            // Mock JwtService methods if needed
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'mockedHash',
        role: 'user',
      };

     
      const bcryptSaltMock = "mockedSalt" as never;
      const bcryptHashMock = "mockedHash" as never;


      // Mock bcrypt.genSalt and bcrypt.hash
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(bcryptSaltMock);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(bcryptHashMock);

      await usersService.createUser(createUserDto);

      expect(userRepositoryMock.create).toHaveBeenCalledWith({
        ...createUserDto,
        tokenBlackList: null,
      });

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, bcryptSaltMock);
      expect(userRepositoryMock.save).toHaveBeenCalled();
    });
  });
})

  // Add more test cases for other methods in UsersService as needed
//   describe('updateUser', () => {
//     it('should update a user', async () => {
//       // Mock data
//       const updatedUser: User = {
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'updatedPassword', // Replace with the actual updated password
//         role: 'user',
//         tokenBlackList: [],
//         group: {
//           id: 1,
//           admin: {
//             username: 'adminUser',
//             email: 'admin@example.com',
//             role: 'admin',
//             tokenBlackList: [],
//             password :"",
//             group:{}
//           },
//         },
//       };

//       // Mock the findOne method of the userRepository
//       (userRepository.findOne as jest.Mock).mockResolvedValueOnce(mockedUser);

//       // Mock the save method of the userRepository
//       (userRepository.save as jest.Mock).mockResolvedValueOnce(updatedUser);

//       const result = await usersService.updateUser(updatedUser);

//       // Expectations
//       expect(result).toEqual(updatedUser);
//       expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' });
//       expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
//     });

//     it('should throw an error if the user is not found', async () => {
//       // Mock the findOne method of the userRepository
//       (userRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

//       const updatedUser: User = {
//         // ... updated user data ...
//       };

//       // Expectation
//       await expect(usersService.updateUser(updatedUser)).rejects.toThrow('User not found');
//     });

//     // Add more test cases for different scenarios in updateUser
//   });

//   // Add more describe blocks for other methods and their test cases
// });
// });
