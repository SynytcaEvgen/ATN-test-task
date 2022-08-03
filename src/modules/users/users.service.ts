import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { User } from '../../db/entity/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<User> {
    const userout = await this.userRepository.save(user);
    return userout;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select()
      .addSelect('user.password')
      .getOne();
    // console.log(user);
    return user;
  }
  async getAllUser(): Promise<User[]> {
    const user = await this.userRepository.find();
    // console.log(user);
    return user;
  }

  async getUserDevice(deviceId: string) {
    const query = getRepository(User)
      .createQueryBuilder('device')
      .leftJoinAndSelect('user.device', 'device')
      .where('divice.id = :id', { deviceId });
    try {
      return await query.getMany();
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
