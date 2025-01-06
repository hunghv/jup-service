import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { Lesson } from './lesson.entity';
import { Review } from './review.entity';
import { Answer } from './answer.entity';
import { Question } from './question.entity';
import { IsOptional } from 'class-validator';
import { Payment } from './payment.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  thumnailUrl: string;

  @Column()
  duration: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  isSale: boolean;

  @Column()
  saleRate: number;

  @Column()
  price: number;

  @Column({ type: 'float', nullable: true }) // Thêm rating vào
  rating: number;

  @ManyToOne(() => User, (user) => user.courses)
  instructor: User;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.course)
  likes: Like[];

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => Question, (question) => question.course)
  questions: Question[]; // Câu hỏi của khóa học

  @OneToMany(() => Answer, (answer) => answer.course)
  answers: Answer[]; // Câu trả lời của khóa học

  @OneToMany(() => Payment, (payment) => payment.user)
  @IsOptional()
  payments?: Payment[];
}
