import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Enrollment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollmentDate: Date;

  @Column({ default: false })
  isCompleted: boolean;
}
