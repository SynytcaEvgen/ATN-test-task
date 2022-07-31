import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Device } from './device.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Name user',
    description: 'User name',
  })
  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @ManyToMany(() => Device, (device) => device.user)
  @JoinTable()
  device: Device;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
