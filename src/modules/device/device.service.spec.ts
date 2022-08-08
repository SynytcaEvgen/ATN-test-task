/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeviceService } from './device.service';
import { User } from '../../db/entity/user.entity';
import { Device } from '../../db/entity/device.entity';
import { v4 as uuidv4 } from 'uuid';

describe('DeviceService', () => {
  let service: DeviceService;

  const deviceData = {
    id: uuidv4(),
    name: 'Some device_01',
    prodId: 'AAA01',
    user: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const userData = {
    id: uuidv4(),
    name: 'Some device_01',
    email: 'someEmail@gmail.com',
    device: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  deviceData.user = [userData, userData];
  userData.device = [deviceData, deviceData];
  
  const mockDeviceRepository = {
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockImplementation(() => {
        return deviceData;
      }),
    })),
    findOne: jest.fn().mockImplementation(() => {
      return deviceData;
    }),
    save: jest.fn().mockImplementation(() => {
      return deviceData;
    }),
    create: jest.fn().mockImplementation(() => {
      return {
        name: 'Some device_01',
        prodId: 'AAA01',
        user: [],
      };
    }),
  };
  const mockUserRepository = {
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockImplementation(() => {
        return userData;
      }),
    })),
    findOne: jest.fn().mockImplementation(() => {
      return userData;
    }),
    save: jest.fn().mockImplementation(() => {
      return userData;
    }),
    create: jest.fn().mockImplementation(() => {
      return {
        name: 'Some device_01',

        email: 'someEmail@gmail.com',
        device: [],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Device),
          useValue: mockDeviceRepository,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  const device = new Device();
  device.name = 'Name';
  device.prodId = 'AAA01';
  const userId = uuidv4();

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.remove).toBeDefined();
    expect(service.findAllDeviceByUser).toBeDefined();
    expect(service.findAllUserByDevice).toBeDefined();
  });
  it('should be create device', () => {
    expect(service.create(device, userId)).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: device.name,
        prodId: device.prodId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('should be create a update device', () => {
    expect(service.update(device, userId)).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: device.name,
        prodId: device.prodId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('should be find a users by device', () => {
    expect(service.findAllUserByDevice('AAA01')).toEqual(
      Promise.resolve([{
        id: expect.any(uuidv4()),
        name: 'Some device_01',
        email: 'someEmail@gmail.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }]),
    );
  });
  it('should be create a device by user', () => {
	  expect(service.findAllDeviceByUser('someEmail@mail.com')).toEqual(
      Promise.resolve([{
        id: expect.any(uuidv4()),
        name: device.name,
        prodId: device.prodId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }]),
    );
  });
});
