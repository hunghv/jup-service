import { Injectable } from '@nestjs/common';
import { CreateNewsManagerDto } from './dto/create-news-manager.dto';
import { UpdateNewsManagerDto } from './dto/update-news-manager.dto';

@Injectable()
export class NewsManagerService {
  create(createNewsManagerDto: CreateNewsManagerDto) {
    return 'This action adds a new newsManager';
  }

  findAll() {
    return `This action returns all newsManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsManager`;
  }

  update(id: number, updateNewsManagerDto: UpdateNewsManagerDto) {
    return `This action updates a #${id} newsManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsManager`;
  }
}
