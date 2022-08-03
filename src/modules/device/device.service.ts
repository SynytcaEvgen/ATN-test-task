import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from 'src/db/entity/device.entity';
import { User } from 'src/db/entity/user.entity';
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

    if (!device)
      throw new NotFoundException(
        `Device with poduct number ${prodId} not found`,
      );
    console.log(device);
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

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user.device;
  }

  async create(device: Device, userId: string): Promise<User> {
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
      return this.userRepository.save(user);
    }
    const createDevice = this.deviceRepository.create(device);
    await this.deviceRepository.save(createDevice);

    user.device.push(createDevice);
    return this.userRepository.save(user);
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
        `In a User don't have device with production number ${prodId}`,
      );
    }

    user.device = user.device.filter((item) => item.prodId !== prodId);

    await this.userRepository.save(user);
  }
}
