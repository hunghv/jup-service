import { PartialType } from '@nestjs/swagger';
import { CreateNewsManagerDto } from './create-news-manager.dto';

export class UpdateNewsManagerDto extends PartialType(CreateNewsManagerDto) {}
