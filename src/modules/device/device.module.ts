import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { User } from '../../db/entity/user.entity';
import { Device } from '../../db/entity/device.entity';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Device]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
    }),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
