import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'text',
    default: 'noname user',
  })
  @IsString({ message: 'Should be string' })
  @IsOptional()
  name: string;
  @ApiProperty({ example: 'examplemail@mail.com', description: 'User Email' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @ApiProperty({ example: '1234567890', description: 'User password' })
  @Length(4, 20, {
    message: 'Password should be has length with 4 to 20 characters',
  })
  password: string;
}
