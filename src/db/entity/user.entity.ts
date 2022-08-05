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
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Name user',
    description: 'User name',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example: 'someemail@email.com',
    description: 'User email this unique identifier',
  })
  @Column('text')
  email: string;

  @ApiProperty({
    example: 'some_Very_strong_pass',
    description: 'User password should be',
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    example: 'array of object',
    description: 'this should be array with a device object',
  })
  @ManyToMany(() => Device, (device) => device.user, { eager: false })
  device: Device[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
