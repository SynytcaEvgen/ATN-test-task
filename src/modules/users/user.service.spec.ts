/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../../db/entity/user.entity';
import { v4 as uuidv4 } from 'uuid';

describe('DeviceService', () => {
  let service: UsersService;

  const userData = {
    id: uuidv4(),
    name: 'Some device_01',
    email: 'someEmail@gmail.com',
    device: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const mockUserRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockImplementation(() => {
        return userData;
      }),
    })),
    find: jest.fn().mockImplementation(() => {
      return [userData];
    }),
    save: jest.fn().mockImplementation(() => {
      return userData;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const createUserDto = {
    name: "Name",
    email: "someEmail@gmail.com",
    password: "smePass",
}

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.getUserByEmail).toBeDefined();
    expect(service.getAllUser).toBeDefined();
  });
  it('should be create user', () => {
    expect(service.create(createUserDto)).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: createUserDto.name,
        email: createUserDto.email,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('should be get user by email', () => {
    expect(service.getUserByEmail("someEmail@gmail.com")).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: 'Name',
        email: 'someEmail@gmail.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('should be get all users', () => {
    expect(service.getAllUser()).toEqual(
      Promise.resolve([{
        id: expect.any(uuidv4()),
        name: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }]),
    );
  });
});
