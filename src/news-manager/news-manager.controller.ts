import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsManagerService } from './news-manager.service';
import { CreateNewsManagerDto } from './dto/create-news-manager.dto';
import { UpdateNewsManagerDto } from './dto/update-news-manager.dto';

@Controller('news-manager')
export class NewsManagerController {
  constructor(private readonly newsManagerService: NewsManagerService) {}

  @Post()
  create(@Body() createNewsManagerDto: CreateNewsManagerDto) {
    return this.newsManagerService.create(createNewsManagerDto);
  }

  @Get()
  findAll() {
    return this.newsManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsManagerDto: UpdateNewsManagerDto,
  ) {
    return this.newsManagerService.update(+id, updateNewsManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsManagerService.remove(+id);
  }
}
