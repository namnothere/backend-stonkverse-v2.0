import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY } from '../../shared/constants';

@Injectable()
export class CloudinaryService {
  constructor(@Inject(CLOUDINARY) private readonly cloudinaryInstance: typeof cloudinary) {}
  async upload(file: string, options: Record<string, any>): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryInstance.uploader.upload(file, options);
  }

  async destroy(publicId: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryInstance.uploader.destroy(publicId);
  }
}
