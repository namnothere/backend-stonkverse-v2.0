import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../../common';
import { CloudinaryService } from '../providers';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post()
  @Public()
  upload(@Body() input: { file: string; folder: string }) {
    return this.cloudinaryService.upload(input.file, { folder: input.folder });
  }
}
