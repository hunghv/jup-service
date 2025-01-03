// src/likes/likes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, User, News } from '../../entities';
import { CreateLikeDto } from '../../models/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like, 'app_db')
    private likesRepository: Repository<Like>,
    @InjectRepository(User, 'app_db')
    private usersRepository: Repository<User>,
    @InjectRepository(News, 'app_db')
    private newsRepository: Repository<News>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const user = await this.usersRepository.findOne({
      where: { id: createLikeDto.userId },
    });
    const news = await this.newsRepository.findOne({
      where: { id: createLikeDto.newsId },
    });

    if (!user || !news) {
      throw new Error('User or News not found');
    }

    const like = this.likesRepository.create({
      user,
      news,
    });

    return this.likesRepository.save(like);
  }
}
