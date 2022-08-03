import { ApiProperty } from '@nestjs/swagger';
import {
  Matches,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    type: 'text',
    default: 'Noname',
  })
  @IsString({ message: 'Should be string' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'AAA01', description: 'It is poroduct number' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,5}$/, {
    message: `Device ID number must contain upper case letters[A-Z], numeric characters [0-9] and must be 5 symbols in length.`,
  })
  prodId: string;
}

export class UpdateDeviceDto {
  @ApiProperty({
    type: 'text',
    default: 'Noname',
  })
  @IsString({ message: 'Should be string' })
  name: string;

  @ApiProperty({ example: 'AAA01', description: 'It is poroduct number' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,5}$/, {
    message: `Device ID number must contain upper case letters[A-Z], numeric characters [0-9] and must be 5 symbols in length.`,
  })
  prodId: string;
}

export class GetAllDeviceDto {
  @ApiProperty({ example: 'AAA01', description: 'It is poroduct number' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,5}$/, {
    message: `Device ID number must contain upper case letters[A-Z], numeric characters [0-9] and must be 5 symbols in length.`,
  })
  prodId: string;
}

export class GetAllUserDto {
  @ApiProperty({
    type: 'text',
    default: 'some@gmail.com',
    description: 'User Email',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}
