import { Entity, ManyToOne, Column } from 'typeorm';
import { Course } from './course.entity';
import { News } from './news.entity';
import { User } from './user.entity';
import { IsOptional } from 'class-validator';
import { BaseEntity } from './base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  @IsOptional()
  user: User;

  @ManyToOne(() => News, (news) => news.comments, { nullable: true })
  @IsOptional()
  news: News;

  @ManyToOne(() => Course, (course) => course.comments, { nullable: true })
  @IsOptional()
  course: Course;

  @Column('text')
  @IsOptional()
  content: string;
}
