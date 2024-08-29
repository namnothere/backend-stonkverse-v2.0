import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import * as controllers from './controllers';
import { CloudinaryService } from './providers';
import { CLOUDINARY } from '../shared/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryFile } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CloudinaryFile]),
  ],
  providers: [
    {
      provide: CLOUDINARY,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        cloudinary.config({
          cloud_name: configService.get<string>('CLD_CLOUD_NAME'),
          api_key: configService.get<string>('CLD_API_KEY'),
          api_secret: configService.get<string>('CLD_API_SECRET'),
        });
        return cloudinary;
      },
    },
    CloudinaryService,
  ],
  controllers: Object.values(controllers),
  exports: [CLOUDINARY, CloudinaryService],
})
export class CloudinaryModule {}
