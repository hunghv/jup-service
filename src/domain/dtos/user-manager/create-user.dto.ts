import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
    description: 'The password for the user',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'James',
    description: 'The username for the user',
  })
  fullname: string;
}
