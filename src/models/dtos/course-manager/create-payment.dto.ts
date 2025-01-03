import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID của người thanh toán',
    example: 'user123',
  })
  userId: string;

  @ApiProperty({
    description: 'ID của khóa học mà người dùng thanh toán',
    example: 'course456',
  })
  courseId: string;

  @ApiProperty({
    description: 'Số tiền thanh toán',
    example: 100.0,
  })
  amount: number;

  @ApiProperty({
    description: 'Trạng thái thanh toán (tùy chọn)',
    required: false,
    example: 'completed',
  })
  status?: string;
}
