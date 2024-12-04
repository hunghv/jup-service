import { Entity, Column, OneToMany } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class News extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @OneToMany(() => Comment, (comment) => comment.news)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.news)
  likes: Like[];
}
