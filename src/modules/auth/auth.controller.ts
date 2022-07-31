import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiTags('Аuthorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'JWT Token' })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Registaration' })
  @ApiResponse({ status: 200, description: 'JWT Token' })
  @Post('/registaration')
  registaration(@Body() userDto: CreateUserDto) {
    return this.authService.registaration(userDto);
  }
}
