import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Nội dung của bình luận',
    example: 'Khóa học này rất hữu ích!',
  })
  content: string;

  @ApiProperty({
    description: 'ID của bài viết (tin tức) mà bình luận này thuộc về',
    example: 'news123',
  })
  newsId: string;

  @ApiProperty({
    description: 'ID của người dùng viết bình luận',
    example: 'user456',
  })
  userId: string;
}
