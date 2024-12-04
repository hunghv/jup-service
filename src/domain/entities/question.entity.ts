import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity'; // Giả sử User entity lưu thông tin người học
import { Answer } from './answer.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Question extends BaseEntity {
  @Column()
  content: string; // Nội dung câu hỏi

  @ManyToOne(() => Course, (course) => course.questions)
  course: Course; // Khóa học mà câu hỏi liên quan đến

  @ManyToOne(() => User, (user) => user.questions)
  user: User; // Người hỏi

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]; // Danh sách các câu trả lời
}
