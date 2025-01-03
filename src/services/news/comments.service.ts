// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, News, Comment } from '../../entities';
import { CreateCommentDto } from '../../models/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment, 'app_db')
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User, 'app_db')
    private usersRepository: Repository<User>,
    @InjectRepository(News, 'app_db')
    private newsRepository: Repository<News>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.usersRepository.findOne({
      where: { id: createCommentDto.userId },
    });
    const news = await this.newsRepository.findOne({
      where: { id: createCommentDto.newsId },
    });

    if (!user || !news) {
      throw new Error('User or News not found');
    }
    const newModel = {
      content: createCommentDto.content,
      user,
      news,
    };
    const comment = this.commentsRepository.create(newModel);

    return this.commentsRepository.save(comment);
  }
}
