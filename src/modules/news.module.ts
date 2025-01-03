import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController, CommentsController } from '../controllers';
import { News, User, Comment, Like } from '../entities';
import { NewsService, LikesService, CommentsService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([News, Like, User, Comment], 'app_db')],
  controllers: [NewsController, CommentsController],
  providers: [NewsService, LikesService, CommentsService],
})
export class NewsModule {}
