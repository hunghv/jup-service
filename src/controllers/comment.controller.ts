import { Controller, Post, Body } from '@nestjs/common';
import { CreateCommentDto } from '../models/dtos';
import { CommentsService } from '../services';
import { Comment } from '../entities';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentsService.create(createCommentDto);
  }
}
