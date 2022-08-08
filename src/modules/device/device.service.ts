import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../db/entity/device.entity';
import { User } from '../../db/entity/user.entity';
import { UpdateDeviceDto } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUserByDevice(prodId: string): Promise<User[]> {
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .where('device.prodId = :prodId', { prodId })
      .leftJoinAndSelect('device.user', 'user')
      .orderBy({ 'user.createdAt': 'DESC' })
      .getOne();

    if (!device) {
      throw new NotFoundException(
        `Device with poduct number ${prodId} not found`,
      );
    }

    if (device.user.length === 0) {
      throw new NotFoundException(
        `Device with poduct number ${prodId} not have a owner`,
      );
    }

    return device.user;
  }
  async findAllDeviceByUser(email: string): Promise<Device[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select()
      .leftJoinAndSelect('user.device', 'device')
      .orderBy({ 'device.createdAt': 'DESC' })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    if (user.device.length === 0) {
      throw new NotFoundException(
        `User with email ${email} not have any device`,
      );
    }

    return user.device;
  }

  async create(device: Device, userId: string): Promise<Device> {
    const existDev = await this.deviceRepository.findOne({
      where: { prodId: device.prodId },
    });
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .select()
      .leftJoinAndSelect('user.device', 'device')
      .orderBy({ 'device.createdAt': 'DESC' })
      .getOne();

    if (existDev) {
      user.device.push(existDev);
      this.userRepository.save(user);
      return existDev;
    }
    const createDevice = this.deviceRepository.create(device);
    await this.deviceRepository.save(createDevice);

    user.device.push(createDevice);
    await this.userRepository.save(user);
    return createDevice;
  }

  async update(updateDto: UpdateDeviceDto, userId: string): Promise<Device> {
    const { prodId } = updateDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.device', 'device')
      .where('user.id = :id', { id: userId })
      .andWhere('device.prodId = :prodId', { prodId })
      .select()
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `In a User don't have device with production number ${prodId}`,
      );
    }
    const device = await this.deviceRepository
      .createQueryBuilder('device')
      .where('device.prodId = :prodId', { prodId })
      .getOne();

    device.name = updateDto.name;
    return this.deviceRepository.save(device);
  }

  async remove(prodId: string, userId: string): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('user.device', 'device')
      .select()
      .getOne();

    if (!user) {
      throw new NotFoundException(
        `User wich has production number ${prodId} not found`,
      );
    }
    if (user.device.length === 0) {
      throw new NotFoundException(
        `In a User don't have device with production number ${prodId}`,
      );
    }
    user.device = user.device.filter((item) => item.prodId !== prodId);

    await this.userRepository.save(user);
  }
}
