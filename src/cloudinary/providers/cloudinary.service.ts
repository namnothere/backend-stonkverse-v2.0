import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';

import { CLOUDINARY, RESULT_STATUS } from '../../shared/constants';
import { BaseApiResponse } from '../../shared/dtos';
import { CloudinaryFileOutput } from '../dtos';
import { CloudinaryFile } from '../entities';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY) private readonly cloudinaryInstance: typeof cloudinary,
    @InjectRepository(CloudinaryFile)
    private readonly cloudinaryFileRepo: Repository<CloudinaryFile>,
  ) {
    if (!this.cloudinaryInstance?.uploader) {
      throw new Error('Cloudinary instance is not properly initialized');
    }
  }

  async upload(file: string, options: Record<string, any>): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryInstance.uploader.upload(file, options);
  }

  async destroy(publicId: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryInstance.uploader.destroy(publicId);
  }

  async uploadFile(file: string, options: Record<string, any>): Promise<BaseApiResponse<CloudinaryFileOutput>> {
    const myCloud = await this.cloudinaryInstance.uploader.upload(file, options);

    const cloudinaryFile = await this.cloudinaryFileRepo.save({
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
    });

    const output = plainToClass(CloudinaryFileOutput, cloudinaryFile, {
      excludeExtraneousValues: true,
    });

    return {
      status: RESULT_STATUS.SUCCEED,
      data: output,
    };
  }
}
