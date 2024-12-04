// src/courses/entities/lesson.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { BaseEntity } from './base.entity';

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  duration: number; // Thời gian bài học (tính bằng phút)

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course; // Mối quan hệ nhiều-một với khóa học

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  documentUrl: string;
}
