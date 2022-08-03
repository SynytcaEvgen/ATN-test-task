import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Device } from './device.entity';

@Entity({ name: 'user' })
@Index(['email'], {
  unique: true,
})
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

  @Column('text', { select: false })
  password: string;

  @ManyToMany(() => Device, (device) => device.user, { eager: false })
  device: Device[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
