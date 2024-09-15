import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../../common';
import { BaseApiResponse } from '../../shared/dtos';
import { CloudinaryFileOutput } from '../dtos';
import { CloudinaryService } from '../providers';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post()
  @Public()
  upload(@Body() input: { file: string; folder: string }): Promise<BaseApiResponse<CloudinaryFileOutput>> {
    return this.cloudinaryService.uploadFile(input.file, { folder: input.folder });
  }
}
