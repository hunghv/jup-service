import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Tiêu đề của khóa học',
    example: 'Khóa học lập trình cơ bản',
  })
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết về khóa học',
    example:
      'Khóa học này giúp bạn nắm vững các khái niệm cơ bản trong lập trình...',
  })
  description: string;

  @ApiProperty({
    description: 'Giá của khóa học',
    example: 199.99,
  })
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'rate giảm giá của đợt này',
    example: '100%',
  })
  @IsOptional()
  saleRate?: number;

  @ApiProperty({
    description: 'khoá học này có đang giảm giá hay không',
    example: 'true',
  })
  @IsOptional()
  isRate?: boolean;
}
