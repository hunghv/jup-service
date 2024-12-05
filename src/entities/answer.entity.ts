import { Entity, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Course } from './course.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('answers')
export class Answer extends BaseEntity {
  @Column()
  content: string; // Nội dung câu trả lời

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question; // Câu hỏi mà câu trả lời này trả lời

  @ManyToOne(() => User, (user) => user.answers)
  user: User; // Người trả lời (Giảng viên)

  @ManyToOne(() => Course, (course) => course.answers)
  course: Course; // Khóa học mà câu hỏi liên quan đến
}
