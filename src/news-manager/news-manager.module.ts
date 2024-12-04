import { Module } from '@nestjs/common';
import { NewsManagerService } from './news-manager.service';
import { NewsManagerController } from './news-manager.controller';

@Module({
  controllers: [NewsManagerController],
  providers: [NewsManagerService],
})
export class NewsManagerModule {}
