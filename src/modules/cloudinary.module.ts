import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './provider/cloudinary.provider';
import { UploadController } from '../controllers/file.controller';
import { CloudinaryService } from '../services/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [UploadController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
