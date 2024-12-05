import { Entity, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { BaseEntity } from './base.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column()
  rating: number; // Đánh giá (ví dụ: từ 1 đến 5)

  @Column()
  comment: string;

  @ManyToOne(() => Course, (course) => course.reviews)
  course: Course;
}
