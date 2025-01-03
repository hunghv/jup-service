import { Controller, Post, Body } from '@nestjs/common';
import { Like } from '../entities';
import { CreateLikeDto } from '../models/dtos';
import { LikesService } from '../services';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likesService.create(createLikeDto);
  }
}
