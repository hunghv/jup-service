import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Tiêu đề của bài viết tin tức',
    example: 'Khám phá công nghệ lập trình mới nhất',
  })
  title: string;

  @ApiProperty({
    description: 'Nội dung chi tiết của bài viết tin tức',
    example:
      'Trong bài viết này, chúng ta sẽ khám phá các xu hướng công nghệ lập trình đang nổi bật...',
  })
  content: string;
}
