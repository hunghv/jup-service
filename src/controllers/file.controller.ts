import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';
import { ResponseModel } from '../models/reponse/response.model';
import { memoryStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @Version('1')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const result = await this.cloudinaryService.uploadImage(file, 'uploads');
    return ResponseModel.success(result.secure_url);
  }

  @Post('images')
  @Version('1')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/image\/(jpeg|png|gif)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadImage(file, 'files')),
    );
    return ResponseModel.success(uploadResults);
  }
}
