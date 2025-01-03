import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Tiêu đề của bài học',
    example: 'Giới thiệu về Biến và Kiểu Dữ Liệu trong JavaScript',
  })
  title: string;

  @ApiProperty({
    description: 'Nội dung chi tiết của bài học',
    example:
      'Trong bài học này, chúng ta sẽ học cách khai báo biến và sử dụng các kiểu dữ liệu cơ bản trong JavaScript...',
  })
  content: string;

  @ApiProperty({
    description: 'URL video (nếu có) cho bài học',
    required: false,
    example: 'https://example.com/video.mp4',
  })
  videoUrl?: string;

  @ApiProperty({
    description: 'URL tài liệu (nếu có) liên quan đến bài học',
    required: false,
    example: 'https://example.com/document.pdf',
  })
  documentUrl?: string;

  @ApiProperty({
    description: 'ID khóa học mà bài học này thuộc về',
    example: 'course123',
  })
  courseId: string;
}
