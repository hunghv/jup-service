import { ApiProperty } from '@nestjs/swagger';
import { CreateLessonDto } from '..';

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
  price: number;

  @ApiProperty({
    description: 'ID của giảng viên đứng lớp',
    example: 'instructor789',
  })
  instructorId: string;

  @ApiProperty({
    description: 'Danh sách các bài học trong khóa học',
  })
  lessons: CreateLessonDto[];
}
