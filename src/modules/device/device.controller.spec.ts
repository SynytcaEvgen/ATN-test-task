import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { JwtAuthGaurd } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

describe('DeviceController', () => {
  let controller: DeviceController;

  const mockDeviceService = {
    create: jest.fn((dto, userId) => {
      return {
        id: uuidv4(),
        ...dto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    }),
    update: jest.fn((dto, userId) => {
      return {
        id: uuidv4(),
        ...dto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    }),
    findAllDeviceByUser: jest.fn().mockImplementation((email) => {
      return [
        {
          id: uuidv4(),
          name: 'Some device_01',
          prodId: 'AAA01',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    }),
    findAllUserByDevice: jest.fn().mockImplementation((prodId) => {
      return [
        {
          id: uuidv4(),
          name: 'Name',
          email: 'someEmail@mail.com',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    }),
  };
  const mockAuthGuard = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
        }),
      ],
      controllers: [DeviceController],
      providers: [DeviceService],
    })
      .overrideProvider(DeviceService)
      .useValue(mockDeviceService)
      .overrideGuard(JwtAuthGaurd)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<DeviceController>(DeviceController);
  });
  const data = {
    name: 'Some device_01',
    prodId: 'AAA01',
  };

  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVFbWFpbEBtYWlsLmNvbSIsImlkIjoiYWZjZmViNzItZjYzZS00ODM2LWIxYzItZDAyODZhZDdjOTIxIiwibmFtZSI6Ik5hbWUiLCJpYXQiOjE2NTk2NzkwNzAsImV4cCI6MTY1OTcwNzg3MH0.ZeKCnCa-fQkHEQpTtyQzC0oOOkz0XRBJ3QP59HGvc7s';
  const req = {
    headers: {
      authorization: token,
    },
  };
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.saveData).toBeDefined();
    expect(controller.updateData).toBeDefined();
    expect(controller.deleteData).toBeDefined();
    expect(controller.getAllDeviceByUser).toBeDefined();
    expect(controller.getAllUserByDevice).toBeDefined();
  });
  it('endpoint saveData', () => {
    expect(controller.saveData(data, req)).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: data.name,
        prodId: data.prodId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('endpoint updateData', () => {
    expect(controller.updateData(data, req)).toEqual(
      Promise.resolve({
        id: expect.any(uuidv4()),
        name: data.name,
        prodId: data.prodId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
  it('endpoint getAllUserByDevice', () => {
    expect(controller.getAllUserByDevice({ prodId: 'AAA01' })).toEqual(
      Promise.resolve([
        {
          id: expect.any(uuidv4()),
          name: 'Name',
          email: 'someEmail@mail.com',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]),
    );
  });
  it('endpoint getAllDeviceByUser', () => {
    expect(
      controller.getAllDeviceByUser(req, { email: 'someEmail@mail.com' }),
    ).toEqual(
      Promise.resolve([
        {
          id: expect.any(uuidv4()),
          name: data.name,
          prodId: data.prodId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]),
    );
  });
});
