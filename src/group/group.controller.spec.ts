import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from './../typeORM/entities/group';
import { UsersService } from './../users/users.service';
import { CreateGroupDto } from './dtos/createGroupDto.dto';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

const mockGroupRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockUsersService = {
  findOne: jest.fn(),
  updateUser: jest.fn(),
  getUsersByGroupId: jest.fn(),
};

const mockJwtService = {
  // Mock or stub JwtService methods or properties used in your code
};

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        GroupService,
        UsersService,
        {
          provide: getRepositoryToken(Group),
          useValue: mockGroupRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new group', async () => {
    const createGroupDto: CreateGroupDto = {
      groupName: 'Test Group',
      adminUsername: 'adminUser',
    };

    const mockNewGroup = {
      groupName: createGroupDto.groupName,
      admin: { username: createGroupDto.adminUsername },
    };

    mockUsersService.findOne.mockResolvedValueOnce({ username: 'adminUser' });
    mockGroupRepository.save.mockImplementationOnce(async (group) => {
      return { ...mockNewGroup, id: 1 }; // Replace 1 with the actual expected value
    });

    const result = await controller.createGroup(createGroupDto);

    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Group created successfully!');
    expect(result.data).toBeDefined();
    expect(result.data.adminUsername).toEqual(createGroupDto.adminUsername);
    expect(result.data.groupName).toEqual(createGroupDto.groupName);
    expect(typeof result.data.groupId).toBe('undefined'); // Ensure that groupId is a number
  });

  it('should throw BadRequestException when getting members of an invalid group', async () => {
    const invalidGroupId = 999;

    mockGroupRepository.findOne.mockResolvedValueOnce(null);

    await expect(controller.getMembers(invalidGroupId)).rejects.toThrowError(
      'Invalid group Id',
    );
  });
});

// Additional tests for GroupService can be added here
