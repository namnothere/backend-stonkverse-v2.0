import { Module } from '@nestjs/common';

// import { CloudinaryProvider } from './cloudinary';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from 'src/shared/constants';

import { CloudinaryService } from './providers';

// @Module({
//   providers: [CloudinaryProvider, CloudinaryService],
//   exports: [CloudinaryProvider, CloudinaryService],
// })
@Module({
  providers: [
    {
      provide: CLOUDINARY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return cloudinary.config({
          cloud_name: configService.get<string>('CLD_CLOUD_NAME'),
          api_key: configService.get<string>('CLD_API_KEY'),
          api_secret: configService.get<string>('CLD_API_SECRET'),
        });
      },
    },
    CloudinaryService,
  ],
  exports: [CLOUDINARY, CloudinaryService],
})
export class CloudinaryModule {}
