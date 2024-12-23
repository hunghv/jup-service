import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'maquouxoufuffa-4717@yopmail.com',
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'maquouxoufuffa',
    required: false,
  })
  @IsOptional()
  password?: string;
}
