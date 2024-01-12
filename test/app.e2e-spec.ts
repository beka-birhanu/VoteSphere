import { test, expect } from '@playwright/test';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto} from 'src/users/dtos/createUserDto.dto';
import { CreateGroupDto } from 'src/group/dtos/createGroupDto.dto';

import { PollController } from 'src/poll/poll.controller';
import { CreatePollDto } from 'src/poll/dtos/createPollDto.dto';
import { GroupService } from 'src/group/group.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/typeORM/entities/user';
import { Group } from 'src/typeORM/entities/group';
import { GetGroupDto } from 'src/group/dtos/getGroupDto.dto';

let app: INestApplication;
let authService: AuthService;
let groupService: GroupService;
let usersService: UsersService;
let pollController: PollController;

test.beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  authService = moduleFixture.get(AuthService);
});

test('should sign up a user', async () => {
  // Set up the test user
  const testUser: CreateUserDto = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
    role: 'user'
  };

  // Simulate a user signing up with their username, email, and password
  const response = await request(app.getHttpServer())
    .post('/auth/signup')
    .send(testUser)
    .expect(201);

  // Check that the response contains the expected user information and tokens
  expect(response.body).toHaveProperty('username', testUser.username);
  expect(response.body).toHaveProperty('role', 'user');
  expect(response.body).toHaveProperty('group', null);
  expect(response.body).toHaveProperty('access_token');
  expect(response.body).toHaveProperty('refresh_token');
});

test.afterAll(async () => {
  await app.close();
});


//testing for creating a group

test.beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  groupService = moduleFixture.get(GroupService);
  usersService = moduleFixture.get(UsersService);
});

test('should create a group', async () => {
  
  const adminUserDto: CreateUserDto = {
    username: 'testadmin',
    email: 'testadmin@example.com',
    password: 'password',
    role: 'Admin',
  };

  // Create the admin user
  await usersService.createUser(adminUserDto);

  // Retrieve the created user
  const adminUser: User | undefined = await usersService.findOne(adminUserDto.username);

  if (!adminUser) {
   
    throw new Error(`Admin user '${adminUserDto.username}' not found.`);
  }

  // Set up the test group
  const testGroup: CreateGroupDto = {
    adminUsername: adminUser.username,
    groupName: 'Test Group',
  };

  const response = await request(app.getHttpServer())
    .post('/group/create')
    .send(testGroup)
    .expect(201);

 
  expect(response.body).toHaveProperty('groupId');
  expect(response.body).toHaveProperty('groupName', testGroup.groupName);
  expect(response.body).toHaveProperty('adminUsername', testGroup.adminUsername);
});


test.afterAll(async () => {
  await app.close();
});



test.beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  pollController = moduleFixture.get(PollController);
  groupService = moduleFixture.get(GroupService);
  usersService = moduleFixture.get(UsersService);
});

test('should create a poll', async () => {
  // Set up the test admin user
const createUserDto: CreateUserDto = {
  username: 'testadmin',
  email: 'testadmin@example.com',
  password: 'password',
  role: 'Admin',
};

// Create the admin user synchronously (assuming createUser does not return anything)
usersService.createUser(createUserDto);

// Retrieve the created user (assuming there's a separate method to find the user)
const adminUser: User | undefined = await usersService.findOne(createUserDto.username);

if (!adminUser) {
  throw new Error(`Admin user '${createUserDto.username}' not found.`);
}

// Set up the test group
const testGroup: GetGroupDto= await groupService.createGroup({
  adminUsername: adminUser.username,
  groupName: 'Test Group',
});

  // Set up the test poll
  const testPoll: CreatePollDto = {
    adminUsername: (await adminUser).username,
    poll: {
      question: 'Test Poll',
      optionOne: 'Option 1',
      optionTwo: 'Option 2',
      optionThree: 'Option 3',
      optionFour: 'Option 4',
      optionFive: 'Option 5',
    },
  };

  // Simulate an admin user creating a new poll
  const response = await request(app.getHttpServer())
    .post('/poll')
    .send(testPoll)
    .expect(201);

  // Check that the response contains the expected poll information
  expect(response.body).toHaveProperty('id');
  expect(response.body).toHaveProperty('question', testPoll.poll.question);
  expect(response.body).toHaveProperty('adminUsername', testPoll.adminUsername);
  expect(response.body).toHaveProperty('options');
  expect(response.body.options.length).toBe(5);
});

test.afterAll(async () => {
  await app.close();
});




