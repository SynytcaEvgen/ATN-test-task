import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User } from '../../db/entity/user.entity';
import { Device } from '../../db/entity/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Device]),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, AuthModule],
})
export class UsersModule {}
