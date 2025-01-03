import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ReviewService } from '../services';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // API thêm đánh giá cho khóa học
  @Post('course/:courseId')
  async addReview(
    @Param('courseId') courseId: string,
    @Body() { rating, comment }: { rating: number; comment: string },
  ) {
    return this.reviewService.addReview(courseId, rating, comment);
  }

  // API lấy danh sách đánh giá của một khóa học
  @Get('course/:courseId')
  async getCourseReviews(@Param('courseId') courseId: string) {
    return this.reviewService.getCourseReviews(courseId);
  }
}
