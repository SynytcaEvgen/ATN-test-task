import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ValidationPipe } from '../pipe/validation.pipe';
import { JwtAuthGaurd } from '../auth/jwt-auth.guard';

import { User } from '../../db/entity/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('rest/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User, description: 'singin user' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = CreateUserDto.name;
    user.email = CreateUserDto.email;
    user.password = CreateUserDto.password;
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User, description: 'get user by email' })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGaurd)
  @Get(':email')
  getUser(@Param('email') email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: User, description: 'get all users' })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGaurd)
  @Get()
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }
}
