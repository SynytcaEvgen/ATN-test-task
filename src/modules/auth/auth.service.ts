import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../../db/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registaration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        `Users with email ${userDto.email} exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const userout = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(userout);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcryptjs.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) {
        return user;
      } else {
        throw new UnauthorizedException({
          message: 'Uncooperative password',
        });
      }
    } else {
      throw new UnauthorizedException({
        message: 'Uncooperative email',
      });
    }
  }
}
