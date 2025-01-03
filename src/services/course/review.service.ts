import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../entities/course.entity';
import { Review } from '../../entities';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review, 'app_db')
    private reviewRepository: Repository<Review>,

    @InjectRepository(Course, 'app_db')
    private courseRepository: Repository<Course>,
  ) {}

  // Hàm thêm đánh giá mới cho khóa học
  async addReview(courseId: string, rating: number, comment: string) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    if (!course) {
      throw new Error('Course not found');
    }

    const review = this.reviewRepository.create({
      rating,
      comment,
      course,
    });

    await this.reviewRepository.save(review);

    // Cập nhật điểm trung bình đánh giá của khóa học
    await this.updateAverageRating(course);

    return review;
  }

  // Hàm tính và cập nhật điểm trung bình của khóa học
  private async updateAverageRating(course: Course) {
    const reviews = await this.reviewRepository.find({ where: { course } });
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    course.rating = averageRating;
    await this.courseRepository.save(course);
  }

  // Hàm lấy danh sách đánh giá của một khóa học
  async getCourseReviews(courseId: string) {
    return this.reviewRepository.find({ where: { course: { id: courseId } } });
  }
}
