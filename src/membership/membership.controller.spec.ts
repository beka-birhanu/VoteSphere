// import { Test, TestingModule } from '@nestjs/testing';
// import { MembershipController } from './membership.controller';
// import { MembershipService } from './membership.service';
// import { GroupService } from '../../src/group/group.service';
// import { UsersService } from '../../src/users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import { NotFoundException, BadRequestException } from '@nestjs/common';

// import { Request } from 'express';
// import { GroupRepository } from '../../src/group/group.repository';

// describe('MembershipController', () => {
//   let controller: MembershipController;
//   let membershipService: MembershipService;
//   let groupService: GroupService;
//   let usersService: UsersService;
//   let jwtService: JwtService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MembershipController],
//       providers: [
//         MembershipService,
//         GroupService,
//         UsersService,
//         JwtService,
//       ],
//     }).compile();

//     controller = module.get<MembershipController>(MembershipController);
//     membershipService = module.get<MembershipService>(MembershipService);
//     groupService = module.get<GroupService>(GroupService);
//     usersService = module.get<UsersService>(UsersService);
//     jwtService = module.get<JwtService>(JwtService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('addMemberToGroup', () => {
//     it('should add a member to the group', async () => {
//       const mockUsername = 'testUser';
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer mockToken',
//         },
//       } as jest.Mocked<Request>;
      
      

//       const mockGroupData = {
//         id: 1,
//         groupName: 'Mock Group',
//         users: [],
//         polls: [],
//         admin: {
//           username: 'adminUser',
//           email: 'admin@example.com',
//           password: 'adminPassword',
//           role: 'Admin',
//           tokenBlackList: [],
//           group: null,
//         },
//       };

//       const mockUserData = {
//         username: 'testUser',
//         email: 'test@example.com',
//         password: 'testPassword',
//         role: 'User',
//         tokenBlackList: [],
//         group: null,
//       };

//       const findGroupByUsernameSpy = jest
//         .spyOn(groupService, 'findByAdminUsername')
//         .mockResolvedValue(mockGroupData);

//       const findUserByUsernameSpy = jest
//         .spyOn(usersService, 'findOne')
//         .mockResolvedValue(mockUserData);

//       const addMemberToGroupSpy = jest
//         .spyOn(membershipService, 'addMemberToGroup')
//         .mockResolvedValue(undefined);

//       const result = await controller.addMemberToGroup(mockUsername, mockRequest);

//       expect(findGroupByUsernameSpy).toHaveBeenCalled();
//       expect(findUserByUsernameSpy).toHaveBeenCalled();
//       expect(addMemberToGroupSpy).toHaveBeenCalled();
//       expect(result).toEqual('successful');
//     });

//     // Add more test cases for error scenarios
//   });

//   describe('removeMemberToGroup', () => {
//     it('should remove a member from the group', async () => {
//       const mockUsername = 'testUser';
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer mockToken',
//         },
//       } as jest.Mocked<Request>;

//       const mockGroupData = {
//         id: 1,
//         groupName: 'Mock Group',
//         users: [],
//         polls: [],
//         admin: {
//           username: 'adminUser',
//           email: 'admin@example.com',
//           password: 'adminPassword',
//           role: 'Admin',
//           tokenBlackList: [],
//           group: null,
//         },
//       };

//       const mockUserData = {
//         username: 'testUser',
//         email: 'test@example.com',
//         password: 'testPassword',
//         role: 'User',
//         tokenBlackList: [],
//         group: null,
//       };

//       const findGroupByUsernameSpy = jest
//         .spyOn(groupService, 'findByAdminUsername')
//         .mockResolvedValue(mockGroupData);

//       const findUserByUsernameSpy = jest
//         .spyOn(usersService, 'findOne')
//         .mockResolvedValue(mockUserData);

//       const removeMemberFromGroupSpy = jest
//         .spyOn(membershipService, 'removeMemberFromGroup')
//         .mockResolvedValue(undefined);

//       const result = await controller.removeMemberToGroup(mockUsername, mockRequest);

//       expect(findGroupByUsernameSpy).toHaveBeenCalled();
//       expect(findUserByUsernameSpy).toHaveBeenCalled();
//       expect(removeMemberFromGroupSpy).toHaveBeenCalled();
//       expect(result).toEqual('successful');
//     });

//     // Add more test cases for error scenarios
//   });
// });
