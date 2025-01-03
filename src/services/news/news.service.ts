import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '../../entities';
import { CreateNewsDto, UpdateNewsDto } from '../../models/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News, 'app_db')
    private newsRepository: Repository<News>,
  ) {}

  async getAllPostsWithLikesAndShares() {
    const posts = await this.newsRepository.find({
      relations: ['likes', 'shares'], // Liên kết với likes và shares
    });

    return posts.map((post) => ({
      ...post,
      likeCount: post.likes.length, // Số lượt thích
      commentsCount: post.comments.length, // Số lượt chia sẻ
    }));
  }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    await this.newsRepository.update(id, updateNewsDto);
    return this.newsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.newsRepository.delete(id);
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async findOne(id: string): Promise<News> {
    return this.newsRepository.findOne({ where: { id } });
  }
}
