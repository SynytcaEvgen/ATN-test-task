import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { User } from './user.entity';

@Entity('device')
export class Device {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Some name of device',
    description: 'Name of device',
  })
  @Column('text', { nullable: true })
  name: string;

  @ApiProperty({
    example: 'AAA01',
    description: 'Device product number this unique identifier',
  })
  @Column('text')
  prodId: string;

  @ApiProperty({
    example: 'array of users',
    description: 'this should be array with a users object',
  })
  @ManyToMany(() => User, (user) => user.device, { eager: true })
  @JoinTable()
  user: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
