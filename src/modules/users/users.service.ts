import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../db/entity/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

    return user;
  }
  async getAllUser(): Promise<User[]> {
    const user = await this.userRepository.find();
    if (!user) {
      throw new NotFoundException(`Users not found`);
    }
    return user;
  }
}
