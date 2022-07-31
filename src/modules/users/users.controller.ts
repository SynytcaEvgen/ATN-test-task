import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipe/validation.pipe';

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
}
