import { Entity, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Payment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.payments)
  user: User; // Người thanh toán

  @ManyToOne(() => Course, (course) => course.payments)
  course: Course; // Khóa học đã thanh toán

  @Column('decimal')
  amount: number; // Số tiền đã thanh toán

  @CreateDateColumn()
  paymentDate: Date; // Ngày thanh toán

  @Column({ default: 'pending' })
  status: string; // Trạng thái thanh toán (ví dụ: pending, completed)
}
