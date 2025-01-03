import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'ID của bài viết (tin tức) mà người dùng yêu thích',
    example: 'news123',
  })
  newsId: string;

  @ApiProperty({
    description: 'ID của người dùng yêu thích bài viết',
    example: 'user456',
  })
  userId: string;
}
