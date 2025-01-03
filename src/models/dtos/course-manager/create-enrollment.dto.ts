import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'ID của người dùng đăng ký khóa học',
    example: 'user123',
  })
  userId: string;

  @ApiProperty({
    description: 'ID của khóa học mà người dùng đăng ký',
    example: 'course456',
  })
  courseId: string;
}
