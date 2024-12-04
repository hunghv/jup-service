import { Entity, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { News } from './news.entity';
import { User } from './user.entity';
import { IsOptional } from 'class-validator';
import { BaseEntity } from './base.entity';

@Entity('likes')
export class Like extends BaseEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @IsOptional()
  user: User;

  @ManyToOne(() => News, (news) => news.likes, { nullable: true })
  @IsOptional()
  news: News;

  @ManyToOne(() => Course, (course) => course.likes, { nullable: true })
  @IsOptional()
  course: Course;
}
