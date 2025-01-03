import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Tiêu đề của khóa học (tùy chọn)',
    required: false,
    example: 'Khóa học nâng cao về lập trình',
  })
  title?: string;

  @ApiProperty({
    description: 'Mô tả chi tiết về khóa học (tùy chọn)',
    required: false,
    example: 'Khóa học giúp bạn nâng cao kiến thức lập trình...',
  })
  description?: string;

  @ApiProperty({
    description: 'Giá của khóa học (tùy chọn)',
    required: false,
    example: 149.99,
  })
  price?: number;

  @ApiProperty({
    description: 'ID giảng viên (tùy chọn)',
    required: false,
    example: 'instructor123',
  })
  instructorId?: string;
}
