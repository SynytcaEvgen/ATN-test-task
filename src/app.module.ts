import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { User } from './db/entity/user.entity';
import { Device } from './db/entity/device.entity';
import { DeviceModule } from './modules/device/device.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [User, Device],
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    DeviceModule,
  ],
})
export class AppModule {}
